import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/globals.css" />
        <title>pappa-70</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
