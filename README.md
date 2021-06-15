# Typewriter
Typewriter is a tool for generating strongly-typed [RudderStack](​https://rudderstack.com​) analytics libraries based on your pre-defined 
Tracking Plan spec.
<br>
<br>
<p align="center">
<img src=".github/assets/readme-example.gif" alt="Typewriter GIF Example" width="80%"/>
</p>
<br>
<br>

- 💪 **Strongly Typed Clients**: Generates strongly-typed [RudderStack](http://rudderstack.com) clients that provide compile-time errors, along with intellisense for event/property names, types and descriptions.

- 👮 **Analytics Testing**: Validate your instrumentation matches your [spec](https://docs.rudderstack.com/tracking-plan/) before deploying to production, so you can fail your CI builds without a manual analytics QA process.

- 🌐 **Cross-Language Support**: Supports native clients for [`Javascript`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk), [`Node.js`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-node-sdk), [`Android`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-android-sdk) and [`analytics-ios`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-ios-sdk).

- ✨ **RudderStack Tracking Plans**: Built-in support to sync your `typewriter` clients with your [centralized RudderStack Tracking Plans](https://docs.rudderstack.com/tracking-plan/).

<br>

# Getting Started

```sh
$ npx typewriter init | initialize | quickstart
```
Starts up a quickstart wizard to create a typewriter.yml and help you generate your first client considering the configuration details you had specified to it.

# Other Commands
## Update

```sh
$ npx typewriter update | u | *                    (default)
```
Syncs plan.json with RudderStack to pull the latest changes in your tracking plan and then generates an updated development client.

## Build

```sh
$ npx typewriter build | b | d | dev | development                    
```
Generates a development client from plan.json.

## Production

```sh
$ npx typewriter prod | p | production                    
```
Generates a production client from plan.json.

## Token

```sh
$ npx typewriter token | tokens | t                    
```
Prints the local RudderStack API token configuration.

## Version

```sh
$ npx typewriter version                    
```
Prints the typewriter CLI version.

## Help

```sh
$ npx typewriter help
```
Prints the help message describing different commands available with TypeWriter.


# CLI Arguments

| Argument | Type | Description |
| :--- | :--- | :--- |
| `config` | `string` | `An optional path to a typewriter.yml (or directory with a typewriter.yml).` |
| `debug` | `boolean` | `An optional (hidden) flag for enabling Ink debug mode.` |
| `version` | `boolean` | `Standard --version flag to print the version of this CLI.` |
| `v` | `boolean` | `Standard -v flag to print the version of this CLI.` |
| `help` | `boolean` | `Standard --help flag to print help on a command.` |
| `h` | `boolean` | `Standard -h flag to print help on a command.` |

# Configuration Reference

Typewriter stores its configuration in a typewriter.yml file in the root of your repo. A sample configuration might look like this:

```sh
# RudderStack Typewriter Configuration Reference (https://github.com/rudderlabs/typewriter)
# Just run `npx typewriter` to re-generate a client with the latest versions of these events.

scripts:
  # You can supply a RudderStack API token using a `script.token` command. The output of `script.token` command should be a valid RudderStack API token. 
  token: source .env; echo $TYPEWRITER_TOKEN
  # You can supply email address linked to your workspace using a `script.email` command.The output of `script.email` command should be an email address registered with your workspace.  
  email: source .env: echo $EMAIL
  # You can format any of Typewriter's auto-generated files using a `script.after` command.
  # See `Formatting Generated Files` below.
  after: ./node_modules/.bin/prettier --write analytics/plan.json

client:
  # Which RudderStack SDK you are generating for.
  # Valid values: analytics.js, analytics-node, analytics-ios, analytics-android.
  sdk: analytics-node
  # The target language for your Typewriter client.
  # Valid values: javascript, java, objective-c, swift.
  language: javascript
  # Javascript Transpilation Settings
  # Valid values: 'ES3','ES5','ES2015','ES2016','ES2017','ES2018','ES2019','ESNext','Latest'
  scriptTarget: 'ES6'
  # Valid values: 'CommonJS','AMD','UMD','System','ES2015','ESNext'
  moduleTarget: 'ESNext'

trackingPlans:
  # The RudderStack Tracking Plan that you are generating a client for.
  # Provide your workspace slug and Tracking Plan id
  # You also need to supply a path to a directory to save your Typewriter client.
  - id: rs_QhWHOgp7xg8wkYxilH3scd2uRID
    workspaceSlug: rudderstack-demo
    path: ./analytics
  ```

## How to integrate Typewriter generated client with your app ?

### Rudder Android SDK
* You can import all the files in the client generated by Typewriter as a package in your project.

* Then you can directly make the calls using the typewriter client as shown below:

```java
// Import your auto-generated Typewriter client:
import com.rudderstack.generated.*

// Issue your first Typewriter track call!
TypewriterAnalytics.with(this).orderCompleted(
  OrderCompleted.Builder()
    .orderID("ck-f306fe0e-cc21-445a-9caa-08245a9aa52c")
    .total(39.99)
    .build()
);
```

### Rudder iOS SDK
* You can now import your new Typewriter client into your project using XCode. If you place your generated files into a folder in your project, import the project as a group not a folder reference.

* Then you can directly make the calls using the typewriter client as shown below:

```obj-c
// Import your auto-generated Typewriter client:
#import "RSTypewriterAnalytics.h"

// Issue your first Typewriter track call!
[RSTypewriterAnalytics orderCompletedWithOrderID: "ck-f306fe0e-cc21-445a-9caa-08245a9aa52c" total: @39.99];
```

### Rudder JS SDK
* You can directly import the generated client using `require()` and make calls if your framework supports that way else you can use `browserify` to generate a bundle that supports your implementation.

#### Using `require()`:

```javascript
// Import Rudder JS SDK and initialize it
const rudderanalytics = require("rudder-sdk-js")
rudderanalytics.load(WRITE_KEY, DATA_PLANE_URL)
// Import your auto-generated Typewriter client:
const typeWriter = require('./typeWriterClient')
// Pass in your rudder-sdk-js instance to Typewriter client
typeWriter.setTypewriterOptions({ analytics: rudderanalytics });
// Issue your first Typewriter track call!
typeWriter.orderCompleted({
  orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
  total:   39.99
})
```

#### Using `browserify`:
* Execute the following command to generate a bundle from the typewriter client:
```sh
browserify typeWriterClient.js --standalone typeWriter >  typeWriterBundle.js
```
* Now make calls from your `html` file as shown below:
```html
<head>
	<script>
		rudderanalytics = window.rudderanalytics = [];
		var methods = ["load", "page", "track", "identify", "alias", "group", "ready", "reset", "getAnonymousId", "setAnonymousId"];
		for (var i = 0; i < methods.length; i++) {
			var method = methods[i];
			rudderanalytics[method] = function (methodName) {
				return function () {
					rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
				};
			}(method);
		}
		rudderanalytics.load(WRITE_KEY, DATA_PLANE_URL);
		rudderanalytics.page();
	</script>
	<script src="https://cdn.rudderlabs.com/v1/rudder-analytics.min.js"></script>
	<script src="./typeWriterBundle.js"></script>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<script>
	typeWriter.setTypewriterOptions({ analytics: rudderanalytics });
    typeWriter.orderCompleted({
    orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
    total:   39.99
    })
</script>
```

### Rudder Node.js SDK:

* You can simply import the the generated typewriter client and start making calls using the typewriter client as shown below:

```javascript
// Import Rudder Node SDK and intialize it
const Analytics = require("@rudderstack/rudder-sdk-node");
const client = new Analytics(WRITE_KEY, DATA_PLANE_URL/v1/batch);
const typewriter = require("./typeWriterClient");
// Pass in your rudder-sdk-node instance to Typewriter.
typewriter.setTypewriterOptions({
  analytics: client
});
// Issue your first Typewriter track call!
typewriter.orderCompleted({
  orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
  total:   39.99
})
```
## Contributing

- To submit a bug report or feature request, [file an issue here](issues).
- To develop on `typewriter` or propose support for a new language, see [our contributors documentation](./.github/CONTRIBUTING.md).
