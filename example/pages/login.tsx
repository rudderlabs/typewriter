import * as React from 'react'
import { LoginForm } from '../components/LoginForm'
import { signInFailed, signInSucceeded, signInSubmitted } from '../analytics'
import { setRudderTyperOptions } from '../analytics'
import { defaultValidationErrorHandler } from '../analytics'

interface Props {
	id: string
	numAttempts: number
	rememberMe: boolean
}

export default class LoginPage extends React.Component<Props> {
	public componentDidMount() {
		// Add a custom onViolation handler for failing tests.
		setRudderTyperOptions({
			onViolation: (message, violations) => {
				if (process.env.NODE_ENV === 'test') {
					// When running tests, throw an error:
					console.error(
						`RudderTyper Violation found in ${message.event} event: ${violations[0].dataPath} ${
							violations[0].message
						}`
					)
					throw new Error()
				} else {
					// Otherwise, print the default ruddertyper warnings to provide context:
					defaultValidationErrorHandler(message, violations)
				}
			},
		})
	}

	private onSubmit(props: Props) {
		signInSubmitted({
			id: props.id,
			numAttempts: props.numAttempts,
			rememberMe: props.rememberMe,
		})
	}

	private onSuccess(props: Props) {
		signInSucceeded({
			id: props.id,
			numAttempts: props.numAttempts,
			rememberMe: props.rememberMe,
		})
	}

	private onError(props: Props) {
		signInFailed({
			id: props.id,
			numAttempts: props.numAttempts,
			rememberMe: props.rememberMe,
		})
	}

	public render() {
		return <LoginForm onSubmit={this.onSubmit} onSuccess={this.onSuccess} onError={this.onError} />
	}
}
