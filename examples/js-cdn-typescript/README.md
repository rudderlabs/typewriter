# Web app with Javascript CDN

This is a basic web application written in TypeScript that uses RudderTyper client library along with JS cdn script.

## Prerequisite(If you want to use your tracking plan)

1. You have setup the tracking plan from the dashboard.
2. Generated PAT from dashboard settings.
3. Did the authentication step using PAT and email to generate `ruddertyper.yml` and `plan.json` file in the root level of the repo.
4. Move ruddertyper.yml file from root level to examples/js-cdn-typescript this folder.
5. Replace the plan.json in js-cdn-typescript/src/analytics with the one you generated.
6. Delete `index.ts` and `rudder.ts` inside analytics folder.
7. Run the command `npx rudder-typer`
8. New `index.ts` and `rudder.ts` file will be generated.

## Steps to run the sample app

1. From terminal go to project folder.
2. Run the command `npm run setup`
3. Run the command `browserify src/analytics/index.ts -p [ tsify ] --standalone rudderTyper > public/rudderTyperBundle.js`
4. Replace the write-key and dataplane url in public > index.html file
5. Run the command `npm start`The app will run in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
6. Click on the track button to fire event.

![Alt text](app.png?raw=true 'Sample Site')

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
