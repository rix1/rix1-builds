<img src="./images/logo.sample.png" alt="Logo of the project" align="right">

# Cabin planner &middot; [[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

> An app for managing resources in large families, FRP if you want.

This is the repo for hytte.lafamilia.no (domain pending) and will be used to book, coordinate and manage cabins, apartments etc in large families.

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
pnpm install
pnpm run prisma push
```

The

## Developing

### Built With

The [T3 stack](https://create.t3.gg/). From their website:

The "T3 Stack" is a web development stack made by Theo focused on simplicity, modularity, and full-stack typesafety. It consists of:

- Next.js
- tRPC
- Tailwind CSS
- TypeScript
- Prisma
- NextAuth.js

### Prerequisites

Nothing. Everything should be self contained in the rix1-builds repo.

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/rix1/rix1-builds.git
cd rix1-builds/apps/cabin-planner/
pnpm install
```

<!-- And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here. -->

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing

<!-- give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does. -->

TODO

## Versioning

<!-- We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags). -->

TODO: N/A?

## Configuration

You need to create a new `.env` file:

```sh
cp dev-template.env .env
```

## Tests

No tests at the moment.

## Style guide

Project is using Prettier and ESlint. ESlint is intentionally not configured with Prettier to avoid configration conflicts. The following commands are available:

```sh
pnpm run prettier
pnpm run eslint
```

Running `pnpm run test` will run Prettier, ESlint and check types with TS.

## Api Reference

Using `tRPC` to run call backend functions in `src/server/`.

## Database

Currently `SQLite` with Prisma as ORM.

## Licensing

State what the license is and how to find the text version of the license.
