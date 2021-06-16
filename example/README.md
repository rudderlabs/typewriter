# RudderTyper Example

This example repo demonstrates how to setup and use RudderTyper in a JavaScript Node.js Platfrom, as a strongly-typed wrapper for [`rudder-sdk-node`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-node-sdk).

## Setup

First, install dependencies:

```sh
$ npm install
```

Then, generate a RudderTyper client:

```sh
$ npx rudder-typer build
```

Update the RudderStack write key in [`index.js`](./index.js#L4) for the source you want to report analytics to:

```javascript
const client = new Analytics(WRITE_KEY, 'DATA_PLANE_URL/v1/batch', { loglevel: 'verbose' })
```

Run the app:

```sh
$ node example.js
```

Once you run the app, go the Debugger to see events coming in!