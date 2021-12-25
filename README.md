# Safari 15 IndexedDB Leaks

## Description

This demo showcases information leaks resulting from an [IndexedDB same-origin policy violation](https://fingerprintjs.com/blog) in [WebKit](https://webkit.org/) (a browser engine primarly used in Safari, as well as all iOS and iPadOS web browsers)


It shows that arbitrary websites can learn a visitor's recent and current browsing activity (pages visited in differnt tabs or windows).

For authenticated visitors the demo can leak Google User IDs and profile pictures (if set).

The supported browsers are Safari 15 on MacOS, and all browsers on iOS and iPadOS 15. Other browsers and platforms are not affected.

Read the [article](https://fingerprintjs.com/blog) for more information.

## Quick start

You need to install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run the application.

To fetch Google profile pictures as part of the demo, you'll need to provide an [People API key](https://developers.google.com/people/v1/how-tos/authorizing#APIKey). 
Rename the `.env.example` file to `.env`, open `.env` and add a valid key.

Open this directory in a terminal and run:

```bash
yarn install
yarn start
```

Then open the application in a browser: http://localhost:1234. 

Use ESLint to check your code style:

```bash
yarn lint
```
