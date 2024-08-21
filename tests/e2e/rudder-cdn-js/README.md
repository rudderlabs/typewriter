# Getting Started with Rudder Typer

## Prerequisite(If you want to use your tracking plan)

1. You have setup the tracking plan from the dashboard.
2. Generated PAT from dashboard settings.
3. Did the authentication step using PAT and email to generate `ruddertyper.yml` and `plan.json` file in the root level of the repo.
4. Move ruddertyper.yml file from root level to tests/e2e/rudder-npm-js this folder.
5. Replace the plan.json in rudder-npm-js/src/analytics with the one you generated.
6. Delete `index.ts` and `rudder.ts` inside analytics folder.
7. Run the command `npx rudder-typer@next`
8. New `index.ts` and `rudder.ts` file will be generated.

## Steps to run the sample app

1. From terminal go to project folder.
2. Run the command `npm i`
3. Run the command `browserify src/analytics/index.ts -p [ tsify ] --standalone rudderTyper > public/rudderTyperBundle.js`
4. Replace the write-key and dataplane url in public > index.html file
5. Run the command `npm start`

The app will run in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
