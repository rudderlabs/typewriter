# RudderTyper Example

This example repo demonstrates how to setup and use RudderTyper in a Java Android Platfrom, as a strongly-typed wrapper for [`rudder-sdk-android`](https://docs.rudderstack.com/stream-sources/rudderstack-sdk-integration-guides/rudderstack-android-sdk).

## Setup

First, install dependencies:

```sh
$ yarn
```

Then, generate a RudderTyper client:

```sh
$ yarn rudder-typer dev
```

Update the RudderStack write key in [`_document.tsx`](./pages/_document.tsx#L48) for the source you want to report analytics to:

```typescript
const analyticsSnippet = snippetFn({
  apiKey: '<Your source write key>',
  page: false,
})
```

Run the development server:

```sh
$ yarn run dev
DONE  Compiled successfully in 1409ms                                       18:15:03

> Ready on http://localhost:3000
No type errors found
Version: typescript 3.1.1
Time: 2219ms
```

Once you run the app, go the Debugger to see events coming in!

## More Documentation

See the [`RudderTyper docs`](https://docs.rudderstack.com/ruddertyper) for more information on instrumenting your app with RudderTyper.
