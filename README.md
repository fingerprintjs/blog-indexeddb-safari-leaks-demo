# Safari 15 IndexedDB Leaks

## Description

This demo showcases information leaks resulting from an [IndexedDB same-origin policy violation](https://fingerprintjs.com/blog/indexeddb-api-browser-vulnerability-safari-15) in [WebKit](https://webkit.org/) (a browser engine primarily used in Safari, as well as all iOS and iPadOS web browsers). You can test this demo on all affected browsers: Safari 15 on macOS, or any browser on iOS and iPadOS 15.

The demo illustrates how any website can learn a visitor's recent and current browsing activity (pages visited in different tabs or windows) using this leak.

For authenticated visitors the demo can leak Google User IDs and profile pictures (if set).

[Read our article](https://fingerprintjs.com/blog/indexeddb-api-browser-vulnerability-safari-15) or watch our [screencast on YouTube](https://www.youtube.com/watch?v=Z7dPeGpCl8s) for more information.

## Quick start

You need to install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run the application.

To fetch Google profile pictures as part of the demo, you'll need to provide an [People API key](https://developers.google.com/people/v1/how-tos/authorizing#APIKey). To do that, rename the `.env.example` file to `.env`, open `.env` and add a valid key.

Open this directory in a terminal and run:

```bash
yarn install
yarn start
```

We use `eslint` to check the code style:

```bash
yarn lint
```
