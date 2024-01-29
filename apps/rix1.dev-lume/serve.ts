import Server from "lume/core/server.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(async (request, next) => {
  const url = new URL(request.url);

  if (url.hostname === "rix1.dev") {
    return new Response(null, {
      status: 307,
      headers: {
        Location: `https://www.rix1.dev${url.pathname}${url.search}`,
      },
    });
  }

  const response = await next(request);
  return response;
});

server.start();

console.log("Listening on http://localhost:8000");
