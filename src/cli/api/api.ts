import got from 'got'
import { JSONSchema7 } from 'json-schema'
import { version } from '../../../package.json'
import { wrapError, isWrappedError } from '../commands/error'
import { sanitizeTrackingPlan } from './trackingplans'
import { set } from 'lodash'

export namespace RudderAPI {
	export type GetTrackingPlanResponse = TrackingPlan

	export type ListTrackingPlansResponse = {
		tracking_plans: TrackingPlan[]
	}

	export type TrackingPlan = {
		name: string
		display_name: string
		rules: {
			events: RuleMetadata[]
			global: RuleMetadata
			identify_traits: RuleMetadata
			group_traits: RuleMetadata
		}
		create_time: Date
		update_time: Date
	}

	export type RuleMetadata = {
		name: string
		description?: string
		rules: JSONSchema7
		version: number
	}

	export type ListWorkspacesResponse = Workspace

	export type Workspace = {
		name: string
		display_name: string
		id: string
		create_time: Date
	}
}

export async function fetchTrackingPlan(options: {
	workspaceSlug: string
	id: string
	token: string
	email: string
}): Promise<RudderAPI.TrackingPlan> {
	const url = `trackingplans/${options.id}`
	const response = await apiGet<RudderAPI.GetTrackingPlanResponse>(
		url,
		options.token,
		options.email
	)

	response.create_time = new Date(response.create_time)
	response.update_time = new Date(response.update_time)

	return sanitizeTrackingPlan(response)
}

// fetchTrackingPlans fetches all Tracking Plans accessible by a given API token
// within a specified workspace.
export async function fetchTrackingPlans(options: {
	token: string
	email: string
}): Promise<RudderAPI.TrackingPlan[]> {
	const url = 'trackingplans'
	const response = await apiGet<RudderAPI.ListTrackingPlansResponse>(
		url,
		options.token,
		options.email
	)
	return response.tracking_plans.map(tp => ({
		...tp,
		create_time: new Date(tp.create_time),
		update_time: new Date(tp.update_time),
	}))
}

// fetchWorkspace lists the workspace found with a given Rudder API token.
export async function fetchWorkspace(options: {
	token: string
	email: string
}): Promise<RudderAPI.Workspace> {
	const resp = await apiGet<RudderAPI.ListWorkspacesResponse>(
		'workspace',
		options.token,
		options.email
	)
	return {
		...resp,
		create_time: new Date(resp.create_time),
	}
}

// validateToken returns true if a token is a valid Rudder API token.
// Note: results are cached in-memory since it is commonly called multiple times
// for the same token (f.e. in `config/`).
type TokenValidationResult = {
	isValid: boolean
	workspace?: RudderAPI.Workspace
}
const tokenValidationCache: Record<string, TokenValidationResult> = {}
export async function validateToken(
	token: string | undefined,
	email: string | undefined
): Promise<TokenValidationResult> {
	if (!token || !email) {
		return { isValid: false }
	}

	// If we don't have a cached result, query the API to find out if this is a valid token.

	if (!tokenValidationCache[token]) {
		const result: TokenValidationResult = { isValid: false }
		try {
			const workspace = await fetchWorkspace({ token, email })
			result.isValid = workspace ? true : false
			result.workspace = workspace ? workspace : undefined
		} catch (error) {
			// Check if this was a 403 error, which means the token is invalid.
			// Otherwise, surface the error becuase something else went wrong.
			if (!isWrappedError(error) || !error.description.toLowerCase().includes('denied')) {
				throw error
			}
		}
		tokenValidationCache[token] = result
	}

	return tokenValidationCache[token]
}

async function apiGet<Response>(url: string, token: string, email: string): Promise<Response> {
	const resp = got(url, {
		baseUrl: 'https://api.rudderstack.com/v1/dg',
		headers: {
			'User-Agent': `RudderTyper: ${version})`,
			Authorization: `Basic ${Buffer.from(email + ':' + token).toString('base64')}`,
		},
		json: true,
		timeout: 10000, // ms
	})

	try {
		const { body } = await resp
		return body
	} catch (error) {
		// Don't include the user's authorization token. Overwrite the header value from this error.
		const tokenHeader = `Bearer ${token.trim().substring(0, 10)}... (token redacted)`
		error = set(error, 'gotOptions.headers.authorization', tokenHeader)

		if (error.statusCode === 401 || error.statusCode === 403) {
			throw wrapError(
				'Permission denied by Rudder API',
				error,
				`Failed while querying the ${url} endpoint`,
				"Verify you are using the right API token by running 'npx rudder-typer tokens'"
			)
		} else if (error.code === 'ETIMEDOUT') {
			throw wrapError(
				'Rudder API request timed out',
				error,
				`Failed while querying the ${url} endpoint`
			)
		}

		throw error
	}
}
