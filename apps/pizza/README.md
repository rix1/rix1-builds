<img src="./static/logo.svg" width="300px" />

This is a pizza calculator to help you get the right ingredients and process.

## Built with

- [Deno Fresh](https://fresh.deno.dev/) 🍋
- [Tailwind](https://tailwindcss.com/) 💨

## Running locally

Start the project:

```sh
deno task start
```

This will watch the project directory and restart as necessary.

## Deploying

This app is deployed on the new [Deno Deploy](https://docs.deno.com/deploy/)
platform. The Deno app is configured in `deno.json`:

```json
{
  "deploy": {
    "org": "rix1",
    "app": "rix1-pizza"
  }
}
```

The new deployment is live at:

```text
https://rix1-pizza.rix1.deno.net
```

While DNS is being moved from Deno Deploy Classic to the new Deploy app, use the
new `deno.net` URL above to verify production.

To deploy a preview build:

```sh
deno task deploy:preview
```

To deploy to production:

```sh
deno task deploy:prod
```

Since this app uses Tailwind, deployment tasks run `deno task build` first so
Fresh can serve the pre-built `_fresh` assets. This app lives in the
`rix1-builds` monorepo, so deployments currently use the local `deno deploy` CLI
flow instead of Deno Deploy's GitHub integration.
