<p align="center">
  <a href="https://rudderstack.com/">
    <img alt="RudderStack" width="512" src="./assets/rs-logo-full-light.jpg">
  </a>
  <br />
  <caption>The Customer Data Platform for Developers</caption>
</p>
<p align="center">
  <b>
    <a href="https://rudderstack.com">Website</a>
    ·
    <a href="https://www.rudderstack.com/docs/data-governance/tracking-plans/ruddertyper/">Documentation</a>
    ·
    <a href="https://rudderstack.com/join-rudderstack-slack-community">Community Slack</a>
  </b>
</p>

# RudderTyper

**RudderTyper** is a tool for generating strongly-typed [**RudderStack**](https://www.rudderstack.com/) analytics libraries based on your pre-defined tracking plan spec.

<p align="center">
<img src=".github/assets/readme-example.gif" alt="RudderTyper GIF Example" width="80%"/>
</p>
<br>

## Features

- **Strongly Typed Clients**: Generates strongly-typed [RudderStack](http://rudderstack.com) clients that provide compile-time errors, along with intellisense for events and property names, types and descriptions.

- **Analytics Testing and Validation**: Lets you validate if your instrumentation matches your spec before deploying to production, so you can fail your CI builds without a manual QA process.

- **Cross-Language Support**: Supports native clients for [**Javascript**](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk), [**Node.js**](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-node-sdk), [**Android**](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-android-sdk) and [**iOS**](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-ios-sdk).

- **RudderStack Tracking Plans**: Built-in support to sync your `ruddertyper` clients with your centralized RudderStack tracking plans.
  <br>

## Get Started

To fire up a quickstart wizard to create a `ruddertyper.yml` and generate your first client with the specified configuration details, run the following command:

```sh
$ npx rudder-typer init | initialize | quickstart
```

## Other Commands

### Update

```sh
$ npx rudder-typer update | u | *   (default)
```

This command syncs `plan.json` with RudderStack to pull the latest changes in your tracking plan and then generates an updated development client.

### Build

```sh
$ npx rudder-typer build | b | d | dev | development
```

This command generates a development client from `plan.json`.

### Production

```sh
$ npx rudder-typer prod | p | production
```

This command generates a production client from `plan.json`.

### Token

```sh
$ npx rudder-typer token | tokens | t
```

This command prints the local RudderStack API token configuration.

### Version

```sh
$ npx rudder-typer version
```

This command prints the RudderTyper CLI version.

### Help

```sh
$ npx rudder-typer help
```

This command prints the help message describing different commands available with RudderTyper.

## CLI Arguments

| Argument  | Type      | Description                                                                      |
| :-------- | :-------- | :------------------------------------------------------------------------------- |
| `config`  | `string`  | An optional path to a `ruddertyper.yml` (or a directory with `ruddertyper.yml`). |
| `debug`   | `boolean` | An optional (hidden) flag for enabling Ink debug mode.                           |
| `version` | `boolean` | Standard `--version` flag to print the version of this CLI.                      |
| `v`       | `boolean` | Standard `-v` flag to print the version of this CLI.                             |
| `help`    | `boolean` | Standard `--help` flag to print help on a command.                               |
| `h`       | `boolean` | Standard `-h` flag to print help on a command.                                   |

## Configuration Reference

RudderTyper stores its configuration in a `ruddertyper.yml` file in the root of your repository.

A sample configuration looks like the following:

```yaml
# RudderStack RudderTyper Configuration Reference (https://github.com/rudderlabs/rudder-typer)
# Just run `npx rudder-typer` to re-generate a client with the latest versions of these events.

scripts:
  # You can supply a RudderStack API token using a `scripts.token` command. The output of `script.token` command should be a valid RudderStack API token.
  token: source .env; echo $RUDDERTYPER_TOKEN

  # You can supply email address linked to your workspace using a `scripts.email` command.The output of `script.email` command should be an email address registered with your workspace.
  email: source .env; echo $EMAIL

  # You can format any of RudderTyper's auto-generated files using a `scripts.after` command.
  # See `Formatting Generated Files` below.
  after: ./node_modules/.bin/prettier --write analytics/plan.json

client:
  # Which RudderStack SDK you are generating for
  # Valid values: analytics.js, analytics-node, analytics-ios, analytics-android.
  sdk: analytics.js

  # The target language for your RudderTyper client.
  # Valid values: javascript, typescript, objective-c, swift, java.
  language: typescript

  # JavaScript Transpilation Settings
  # Valid values: 'ES3','ES5','ES2015','ES2016','ES2017','ES2018','ES2019','ESNext','Latest'
  scriptTarget: 'ES5'

  # Valid values: 'CommonJS','AMD','UMD','System','ES2015','ESNext'
  moduleTarget: 'ESNext'

trackingPlans:
  # The RudderStack Tracking Plan that you are generating a client for.
  # Provide your workspace slug and Tracking Plan id
  # You also need to supply a path to a directory to save your RudderTyper client.
  - id: rs_QhWHOgp7xg8wkYxilH3scd2uRID
    workspaceSlug: rudderstack-demo
    path: ./analytics

    # Valid values: v1 (old tracking plan), v2 (new tracking plan format)
    APIVersion: v2
```

## How to integrate RudderTyper-generated client with your app?

This section includes steps to integrate your RudderTyper-generated client with your app across different RudderStack SDKs.

### RudderStack Android SDK

- Import all the files in the client generated by RudderTyper as a package in your project.

- Then, you can directly make the calls using the RudderTyper client as shown below:

```java
// Import your auto-generated RudderTyper client:
import com.rudderstack.generated.*

  // Issue your first RudderTyper track call!
  RudderTyperAnalytics.with(this).orderCompleted(
    OrderCompleted.Builder()
    .orderID("ck-f306fe0e-cc21-445a-9caa-08245a9aa52c")
    .total(39.99)
    .build()
  );
```

### RudderStack iOS SDK

- Import your RudderTyper client into your project using XCode.

**Note**: If you place your generated files into a folder in your project, import the project as a group not a folder reference.

- Then, you can directly make the calls using the RudderTyper client as shown:

```obj-c
// Import your auto-generated RudderTyper client:
#import "RSRudderTyperAnalytics.h"

// Issue your first RudderTyper track call!
[RSRudderTyperAnalytics orderCompletedWithOrderID: "ck-f306fe0e-cc21-445a-9caa-08245a9aa52c" total: @39.99];
```

### RudderStack JavaScript SDK

- Import the RudderTyper-generated client using `require()` and make the calls if your framework supports them. Otherwise, you can use [**Browserify**](https://browserify.org/) to generate a bundle that supports your implementation. The implementation for each of the alternatives mentioned above will be as shown:

#### Using the `require()`method

```javascript
// Import RudderStack JS SDK and initialize it
var RudderAnalytics = require('@rudderstack/analytics-js');

const rudderAnalytics = new RudderAnalytics();
rudderAnalytics.load(WRITE_KEY, DATA_PLANE_URL, {});

// Import your auto-generated RudderTyper client:
const rudderTyper = require('./analytics/index');

// Pass in your @rudderstack/analytics-js instance to RudderTyper client
rudderTyper.setRudderTyperOptions({
  analytics: rudderAnalytics,
});

// Issue your first RudderTyper track call!
rudderTyper.orderCompleted({
  orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
  total: 39.99,
});
```

#### Using `browserify`

- Execute the following command to generate a bundle from the RudderTyper client:

```sh
browserify analytics/index.js --standalone rudderTyper >  rudderTyperBundle.js
```

- Now you can make calls from your `html` file as shown:

```html
<head>
  <script>
    rudderanalytics = window.rudderanalytics = [];
    var methods = [
      'load',
      'page',
      'track',
      'identify',
      'alias',
      'group',
      'ready',
      'reset',
      'getAnonymousId',
      'setAnonymousId',
    ];
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      rudderanalytics[method] = (function (methodName) {
        return function () {
          rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
        };
      })(method);
    }
    rudderanalytics.load(YOUR_WRITE_KEY, DATA_PLANE_URL);
    rudderanalytics.page();
  </script>
  <script src="https://cdn.rudderlabs.com/v1/rudder-analytics.min.js"></script>
  <script src="./rudderTyperBundle.js"></script>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<script>
  rudderTyper.setRudderTyperOptions({
    analytics: rudderanalytics,
  });
  rudderTyper.orderCompleted({
    orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
    total: 39.99,
  });
</script>
```

### RudderStack Node.js SDK

- Import the the RudderTyper-generated client and start making calls using RudderTyper as shown:

```javascript
// Import Rudder Node SDK and initialize it
const RudderAnalytics = require('@rudderstack/rudder-sdk-node');

const client = new RudderAnalytics(WRITE_KEY, {
  dataPlaneUrl: DATA_PLANE_URL,
  // More initialization options
});

const ruddertyper = require('./analytics/index');
// Pass in your @rudderstack/rudder-sdk-node instance to RudderTyper.
ruddertyper.setRudderTyperOptions({
  analytics: client,
});

// Issue your first RudderTyper track call!
ruddertyper.orderCompleted({
  orderID: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
  total: 39.99,
});
```

## Contribute

We encourage contributions to this project. For detailed guidelines on how to contribute, please refer to [**here**](./CONTRIBUTING.md).

## Contact us

For more information on any of the sections covered in this readme, you can [**contact us**](mailto:%20docs@rudderstack.com) or start a conversation on our [**Slack**](https://resources.rudderstack.com/join-rudderstack-slack) channel.

## Follow Us

- [RudderStack Blog][rudderstack-blog]
- [Slack][slack]
- [Twitter][twitter]
- [LinkedIn][linkedin]
- [dev.to][devto]
- [Medium][medium]
- [YouTube][youtube]
- [HackerNews][hackernews]
- [Product Hunt][producthunt]

## :clap: Our Supporters

[![Stargazers repo roster for @rudderlabs/rudder-typer](https://reporoster.com/stars/rudderlabs/rudder-typer)](https://github.com/rudderlabs/rudder-typer/stargazers)

[![Forkers repo roster for @rudderlabs/rudder-typer](https://reporoster.com/forks/rudderlabs/rudder-typer)](https://github.com/rudderlabs/rudder-typer/network/members)

<!----variables---->

[rudderstack-blog]: https://rudderstack.com/blog/
[slack]: https://resources.rudderstack.com/join-rudderstack-slack
[twitter]: https://twitter.com/rudderstack
[linkedin]: https://www.linkedin.com/company/rudderlabs/
[devto]: https://dev.to/rudderstack
[medium]: https://rudderstack.medium.com/
[youtube]: https://www.youtube.com/channel/UCgV-B77bV_-LOmKYHw8jvBw
[hackernews]: https://news.ycombinator.com/item?id=21081756
[producthunt]: https://www.producthunt.com/posts/rudderstack
