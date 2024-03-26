import got from 'got';
import { JSONSchema7 } from 'json-schema';
import { version } from '../../../package.json';
import { wrapError, isWrappedError } from '../commands/error';
import { sanitizeTrackingPlan } from './trackingplans';
import { set } from 'lodash';
import { APIError } from '../types';

export namespace RudderAPI {
  export type GetTrackingPlanResponse = TrackingPlan;

  export type ListTrackingPlansResponse = {
    tracking_plans: TrackingPlan[];
  };

  export type TrackingPlan = {
    name: string;
    version: string;
    id: string;
    rules: {
      events: RuleMetadata[];
      global: RuleMetadata;
      identify_traits: RuleMetadata;
      group_traits: RuleMetadata;
    };
    createdAt: Date;
    updatedAt: Date;
  };

  export type RuleMetadata = {
    name: string;
    description?: string;
    rules: JSONSchema7;
    version: number;
  };

  export type ListWorkspacesResponse = Workspace;

  export type Workspace = {
    name: string;
    id: string;
    createdAt: Date;
  };
}

export async function fetchTrackingPlan(options: {
  workspaceSlug: string;
  id: string;
  token: string;
  email: string;
}): Promise<RudderAPI.TrackingPlan> {
  const url =
    'workspaces/1Rgdwcyd93G37qqMOs03KWiTQd2/catalog/tracking-plans/tp_2dHb5Dq7Ikav1AT3b2rpeQVoIES';
  const response = await apiGet<RudderAPI.GetTrackingPlanResponse>(
    url,
    options.token,
    options.email,
  );

  response.createdAt = new Date(response.createdAt);
  response.updatedAt = new Date(response.updatedAt);

  return sanitizeTrackingPlan(response);
}

// fetchTrackingPlans fetches all Tracking Plans accessible by a given API token
// within a specified workspace.
export async function fetchTrackingPlans(options: {
  token: string;
  email: string;
}): Promise<RudderAPI.TrackingPlan[]> {
  const url = 'trackingplans';
  const response = await apiGet<RudderAPI.ListTrackingPlansResponse>(
    url,
    options.token,
    options.email,
  );
  return response.tracking_plans.map(tp => ({
    ...tp,
    createdAt: new Date(tp.createdAt),
    updatedAt: new Date(tp.updatedAt),
  }));
}

// fetchWorkspace lists the workspace found with a given Rudder API token.
export async function fetchWorkspace(options: {
  token: string;
  email: string;
}): Promise<RudderAPI.Workspace> {
  const resp = await apiGet<RudderAPI.ListWorkspacesResponse>(
    'workspace',
    options.token,
    options.email,
  );
  return {
    ...resp,
    createdAt: new Date(resp.createdAt),
  };
}

// validateToken returns true if a token is a valid Rudder API token.
// Note: results are cached in-memory since it is commonly called multiple times
// for the same token (f.e. in `config/`).
type TokenValidationResult = {
  isValid: boolean;
  workspace?: RudderAPI.Workspace;
};
const tokenValidationCache: Record<string, TokenValidationResult> = {};
export async function validateToken(
  token: string | undefined,
  email: string | undefined,
): Promise<TokenValidationResult> {
  if (!token || !email) {
    return { isValid: false };
  }

  // If we don't have a cached result, query the API to find out if this is a valid token.

  if (!tokenValidationCache[token]) {
    const result: TokenValidationResult = { isValid: false };
    try {
      const workspace = await fetchWorkspace({ token, email });
      result.isValid = workspace ? true : false;
      result.workspace = workspace ? workspace : undefined;
    } catch (error) {
      // Check if this was a 403 error, which means the token is invalid.
      // Otherwise, surface the error becuase something else went wrong.
      if (!isWrappedError(error) || !error.description.toLowerCase().includes('denied')) {
        throw error;
      }
    }
    tokenValidationCache[token] = result;
  }

  return tokenValidationCache[token];
}

async function apiGet<Response>(url: string, token: string, email: string): Promise<Response> {
  const resp = got(url, {
    baseUrl:
      url === 'workspace'
        ? 'https://api.rudderstack.com/v1'
        : url === 'trackingplans'
        ? 'https://api.rudderstack.com/v1/dg'
        : 'https://api.rudderstack.com',
    headers: {
      authorization:
        url === 'workspace' || url === 'trackingplans'
          ? `Basic ${Buffer.from(email + ':' + token).toString('base64')}`
          : 'Bearer eyJraWQiOiJocDIwQ1wvTVNsYU9tZXdlcFMrMkZRaHNhb05jeVpMSlNYTXRmaEFwRkc5UT0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206d29ya3NwYWNlUm9sZXMiOiJ7XCIxUmdkd2N5ZDkzRzM3cXFNT3MwM0tXaVRRZDJcIjp7XCJvcmdhbml6YXRpb25JZFwiOlwiMWM4N2VCaEdmUGl5RnF3Nzh3c0tTRDZ3SjBwXCIsXCJyb2xlXCI6XCJtZW1iZXJcIn0sXCIxdGM2eDU1VFNRQzlDNmlLQVdjZWVnMW5HZG9cIjp7XCJvcmdhbml6YXRpb25JZFwiOlwiMXRjNng1QTlEWEtvUHVrOGNCcHhoZWFhZk5sXCIsXCJyb2xlXCI6XCJhZG1pblwifSxcIjI4aTM4eHpIenpHWmFxV2FiQktDcmNETnhjZFwiOntcIm9yZ2FuaXphdGlvbklkXCI6XCIyOGkzOHlmZWUzbkhNbTZxYnRWQnNmcnZMTmtcIixcInJvbGVcIjpcIm1lbWJlclwifSxcIjF6OFFVY1p4NDlmenM0VjN3SXFOSlJIMGVtclwiOntcIm9yZ2FuaXphdGlvbklkXCI6XCIxejhRVHlnMmtlMEFzSW1LMXk1YmlITlRkVGxcIixcInJvbGVcIjpcInJlYWQtd3JpdGVcIn19Iiwic3ViIjoiNTU5MzUwZTEtZDFlZC00NTBiLWEyOWEtNTQyYTViZmZlYzg0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0FCWmlUalhpYSIsImN1c3RvbTp0b2tlblZlcnNpb24iOiIxMyIsImNvZ25pdG86dXNlcm5hbWUiOiI1NTkzNTBlMS1kMWVkLTQ1MGItYTI5YS01NDJhNWJmZmVjODQiLCJjdXN0b206dXNlcklkIjoiMXRialRTYm5ObkNQY25mZlJ3MGpTRmxOamljIiwib3JpZ2luX2p0aSI6IjdmNTU4Y2VmLThiNjUtNGY5Ni1iNWI0LTI4MzI2OWQyYzExZCIsImF1ZCI6IjF1ZG1mOGlxMG02ajFtaHUwZjJ0M2tkZGcwIiwiZXZlbnRfaWQiOiI2ODM4ODQ3ZS1jY2ZjLTQwZTItYWM4MC03NzkxMjk4MTNiMmUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcwOTIxNDU5MCwibmFtZSI6IkFrYXNoIEd1cHRhIiwiZXhwIjoxNzEwNDEzNTk5LCJpYXQiOjE3MTA0MDk5OTksImp0aSI6ImQyZmZjMGRmLTAzZWUtNGQyYi1iNjZmLWZiZGMyYWY5ODgzNyIsImVtYWlsIjoiYWthc2hAcnVkZGVyc3RhY2suY29tIn0.ZictoHuoqTcsD_kVmm9rFiIibbHpvE5sPoGEm7VMlJkxhPi_1OgE5vn-1Y4d2k3zqsxmFtkF_NtQxuCt6pGWHnP9fpTXvEZZ9gSpcC8cEdWefuFUrW9pL8xzPyjsay9uRfnumanCao-pDmf771mDUgUPmCw7z6QPnWagZtilA2mPPkPzFi5w6ebosWhRQ7C5EYzaxz5GIF83KKAG1UwXQ4A7iQptdAndK8G2Xz2BgCLGAaCbxSEOclm4KerUe3XQUyzOMLwfsM7C5ogPt0X_nnrX8MuqJg0WeTC1TcDsnZRhrwb7GctzbHEu1gHHgJKxGTUR2TqpHuSm0B1ZBcUCIg',
    },
    json: true,
    timeout: 10000, // ms
  });

  try {
    const { body } = await resp;
    return body;
  } catch (error) {
    const err = error as APIError;
    // Don't include the user's authorization token. Overwrite the header value from this error.
    const tokenHeader = `Bearer ${token.trim().substring(0, 10)}... (token redacted)`;
    error = set(err, 'gotOptions.headers.authorization', tokenHeader);

    if (err.statusCode === 401 || err.statusCode === 403) {
      throw wrapError(
        'Permission denied by Rudder API',
        err,
        `Failed while querying the ${url} endpoint`,
        "Verify you are using the right API token by running 'npx rudder-typer tokens'",
      );
    } else if (err.code === 'ETIMEDOUT') {
      throw wrapError(
        'Rudder API request timed out',
        err,
        `Failed while querying the ${url} endpoint`,
      );
    }
    throw error;
  }
}
