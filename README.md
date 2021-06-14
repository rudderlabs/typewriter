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

```
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

trackingPlans:
  # The RudderStack Tracking Plan that you are generating a client for.
  # Provide your workspace slug and Tracking Plan id
  # You also need to supply a path to a directory to save your Typewriter client.
  - id: rs_QhWHOgp7xg8wkYxilH3scd2uRID
    workspaceSlug: rudderstack-demo
    path: ./analytics
  ```
## Contributing

- To submit a bug report or feature request, [file an issue here](issues).
- To develop on `typewriter` or propose support for a new language, see [our contributors documentation](./.github/CONTRIBUTING.md).
