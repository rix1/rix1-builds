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


## Deploying to production

Using [`deployctl`](https://docs.deno.com/deploy/manual/deployctl) for Deno deploy, simply run

```sh
deno task deploy:prod # or deploy:preview
```

Since we're using Tailwind, we need to build files ahead of time. Usually you want to do that with Github Actions, but the monorepo-nature of rix1-builds complicates this. Luckily Deno Fresh will look for pre-built snapshots in `_fresh` when starting up, so we can easily build locally and just upload all assets with `deployctl`.
