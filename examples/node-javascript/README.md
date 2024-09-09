# Node.js App with JavaScript

This is a basic template for a Node.js application written in JavaScript that uses RudderTyper client library.

This example already includes the generated RudderTyper client library of a sample tracking plan.

See `ruddertyper.yml` and `analytics/` directory for the tracking plan and the generated client library respectively.

## Installation

1. Run `npm run setup` to install the required dependencies.

## Usage

1. Clone `.env.sample` and rename it to `.env`.
2. Set the values for write key and data plane URL in the `.env` file.
3. To start the Node.js app, run the following command:

```
npm run start
```

4. This will send a bunch of track events to the specified data plane URL.

## Regenerate client libraries

Ensure to update the instrumentation in `index.js` file as per the new tracking plan before executing the app.

### Production RudderTyper

Run the following command to regenerate the client library based on your tracking plan using the production version of RudderType in NPM:

```
npx rudder-typer init
```

You can further execute various RudderTyper commands like,

```
npx rudder-typer <command>
```

### Development RudderTyper

Execute the following steps to regenerate the client library based on your tracking plan using the RudderType module from the local repository:

Note: Ensure that you have setup the repository for development.

```
npm run rudder-typer:dev init
```

This will build the RudderTyper module locally and regenerates the client library based on the tracking plan.

You can further execute various RudderTyper commands like,

```
npm run rudder-typer:dev <command>
```
