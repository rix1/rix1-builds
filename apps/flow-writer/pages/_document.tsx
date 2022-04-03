import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap"
            rel="stylesheet"
          ></link>
          {/* <meta
            name="theme-color"
            content="#0b3e05"
            media="(prefers-color-scheme: light) "
          />
          <meta
            name="theme-color"
            content="#c77d43"
            media="(prefers-color-scheme: dark)"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
