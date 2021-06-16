const Analytics = require('@rudderstack/rudder-sdk-node')

// we need the batch endpoint of the Rudder server you are running
const client = new Analytics(WRITE_KEY, 'DATA_PLANE_URL/v1/batch', { loglevel: 'verbose' })

const rudderTyper = require('./analytics/')

// Pass in your analytics-node instance to Typewriter.
rudderTyper.setRudderTyperOptions({
	analytics: client,
})

rudderTyper.enumTypes(
	{
		userId: 'john',
		properties: {
			'string const': 'Rick Sanchez',
			'string enum': 'Lawyer Morty',
			id: '4009',
			numAttempts: 2,
			rememberMe: false,
		},
	},
	() => {
		console.log('Enum Types Callback triggered')
	}
)

rudderTyper.unionType(
	{
		userId: 'john',
		properties: {
			universe_name: 'Evil Morthy',
			id: '4009',
			numAttempts: 2,
			rememberMe: false,
		},
	},
	() => {
		console.log('Union Type Callback triggered')
	}
)

rudderTyper.everyNullableRequiredType(
	{
		properties: {
			'required any': 'Rick Sanchez',
			'required array': [137, 'C-137'],
			'required boolean': false,
			'required int': 97,
			'required number': 3.14,
			'required object': {},
			'required string': 'Alpha-Betrium',
			'required string with regex': 'Lawyer Morty',
			'required array with properties': [
				{
					'required any': 'Rick Sanchez',
					'required array': [137, 'C-137'],
					'required boolean': false,
					'required int': 97,
					'required number': 3.14,
					'required object': {},
					'required string': 'Alpha-Betrium',
					'required string with regex': 'Lawyer Morty',
				},
			],
			'required object with properties': {
				'required any': 'Rick Sanchez',
				'required array': [137, 'C-137'],
				'required boolean': false,
				'required int': 97,
				'required number': 3.14,
				'required object': {},
				'required string': 'Alpha-Betrium',
				'required string with regex': 'Lawyer Morty',
			},
		},
		userId: 'john',
	},
	() => {
		console.log('Every nullable required type callback triggered')
	}
)
