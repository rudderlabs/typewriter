# Web app with Javascript NPM package

This is a basic web application written in TypeScript that uses RudderTyper client library along with the JS SDK NPM package.

## Steps to run the sample app

1. Run `npm run setup` to install the required dependencies.
2. Replace `writeKey` and `dataPlaneUrl` values in `./src/useRudderAnalytics.ts` file.
3. Run the command `npm start`. The app will run in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. Click on the track button to fire event.

![Alt text](app.png?raw=true 'Sample Site')

> Note: If you are building your own sample app, `@rudderstack/analytics-js` npm package must be added as a dev dependency of the package.json.

## Regenerate client libraries

Run the command `npx rudder-typer`. This will generate new `index.ts` file based on the ruddertyper.yml.

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
npm run ruddertyper:dev init
```

This will build the RudderTyper module locally and regenerates the client library based on the tracking plan.

You can further execute various RudderTyper commands like,

```
npm run ruddertyper:dev <command>
```
