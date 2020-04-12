# Cabify Checkout
A simple cart project with 3 products developed using the web components v1 API powered by lit-element. This technology was chosen due to it's high portability and low weight. It can be imported into any front-end project by adding the generated scripts.

## Setup
To install the project clone it and the run:

```bash
npm i
```

## NPM scripts

### `start`
Start the development server on port `4200`

```bash
npm start
```

### `build`
Generate the JS bundles, copy all assets and inject scripts into the index HTML file.

```bash
npm run build
```

### `test`
Run all unit tests and generate a coverage report (powered by [Jest](https://jestjs.io/)).

```bash
npm test
```

### `test:watch`
Run all unit tests and watch for file changes, great for developing unit tests.

```bash
npm run test:watch
```

## Package API
When declaring this npm package as a dependency you can access the following es modules:
* `Checkout` A JS class that handles product operations