# BlockSettle Client Portal

BlockSettle Client Portal on React/TypeScript stack

## Important environment variables

To use/build applications with removed by security reasons variables, ask them from other developers and 
put to `.env.prod` and `.env.dev` files:

```sh
EVERYPAY_API_USERNAME = <...>
EVERYPAY_API_SECRET = <...>
EVERYPAY_ACCOUNT_ID = <...>
```

## Dockerized stack

It requires high-level meta-repository gitlab.axmit.com:GenoaIO/stack.git which
dockerized all environments

### How to run client-portal

```sh
docker-compose up client-portal # ...then press `Ctrl\Cmd + C` to stop
```

### How to install/remove `npm` packages

```sh
docker-compose run client-portal yarn add <your-package>
docker-compose run client-portal yarn remove <your-package>
```

## Without dockerized stack

You also can run Client Portal not in stack, but it requires extra setup.

### Setup .env

First, setup next variables in your own `.env.dev`:

```sh
CLEARING_DOCUMENTS_BASE_URL = <blocksettle.local>/upload/
CLEARING_WS_URI = <blocksettle.local>/websocket
CLEARING_WEB_SERVICE_URI = <blocksettle.local>/
```

As example, this settings could use staging or production servers, if they have proper CORS config on proxy server.

### Install dependencies

We use [Yarn](https://yarnpkg.com/lang/en/docs/install/) package manager - please install this one.

Once it would be done, you need to install **npm** dependencies:

```sh
yarn install --frozen-lockfile # if it fails, you can retry without `--frozen-lockfile` option
```

### Run dev server

To run [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/) type next command:

```sh
yarn start
```

### Build

To build all SPAs to `./www` folder (excluded from this git repo), run command:

```sh
yarn build
```

### Install, remove and update npm packages

Just learn easy-to-use Yarn and use it!

## Contributors

- Vasiliy Telyatnikov <vtelyatnikov@axmit.com>
- Andrey Cherepanov <acherepanov@axmit.com>
