# Web app with Javascript NPM package

This is a basic web application written in TypeScript that uses RudderTyper client library along with the JS SDK NPM package.

## Steps to run the sample app

1. Run `npm run setup` to install the required dependencies.
2. Replace `writeKey` and `dataPlaneUrl` values in `./src/useRudderAnalytics.ts` file.
3. Run the command `npm start`. The app will run in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. Click on the track button to fire event.

![Alt text](app.png?raw=true 'Sample Site')

## Regenerate client libraries

1. Run the command `npx rudder-typer`. This will generate new `index.ts` and `rudder.ts` file based on the ruddertyper.yml.
2. Add `import type { RudderAnalytics, RudderAnalyticsPreloader } from '@rudderstack/analytics-js';` this line at the top of `rudder.ts` file and update _rudderanalytics_ interface type to `rudderanalytics: RudderAnalytics | RudderAnalyticsPreloader | undefined;`

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
