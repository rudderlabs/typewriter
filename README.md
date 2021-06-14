<p align="center">
  <h1 align="center"> Typewriter </h1>
  <img src=".github/assets/readme-example.gif" alt="Typewriter GIF Example" width="80%"/>
</p>

- 💪 **Strongly Typed Analytics**: Generates strongly-typed [RudderStack](http://rudderstack.com) analytics clients that provide compile-time errors, along with intellisense for event/property names, types and descriptions.

- 👮 **Analytics Testing**: Validate your instrumentation matches your [spec](https://docs.rudderstack.com/tracking-plan/) before deploying to production, so you can fail your CI builds without a manual analytics QA process.

- 🌐 **Cross-Language Support**: Supports native clients for [`Javascript`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk), [`Node.js`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-node-sdk), [`Android`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-android-sdk) and [`analytics-ios`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-ios-sdk).

- ✨ **RudderStack Tracking Plans**: Built-in support to sync your `typewriter` clients with your [centralized RudderStack Tracking Plans](https://docs.rudderstack.com/tracking-plan/).

## Get Started

```sh
# Walks you through setting up a `typewriter.yml` and generating your first client.
$ npx typewriter init
```

For more instructions on setting up your `typewriter` client, such as adding it to your CI, see our [documentation](https://docs.rudderstack.com/typewriter).

## Contributing

- To submit a bug report or feature request, [file an issue here](issues).
- To develop on `typewriter` or propose support for a new language, see [our contributors documentation](./.github/CONTRIBUTING.md).
