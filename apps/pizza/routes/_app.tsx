import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>pizza</title>
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
