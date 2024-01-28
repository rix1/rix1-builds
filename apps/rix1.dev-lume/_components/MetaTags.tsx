const MetaTags = () => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta
        property="og:title"
        content="rix1.dev: Product developer from Norway 🇳🇴"
      />
      <meta
        property="og:description"
        content="Dev, design, product and hooman. Currently having fun chasing the sun together with @OtovoSolar"
      />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:width" content="1200" />
      <meta
        property="og:image:alt"
        content="On the internet, I'm usually referred to as @rix1. I'm a product developer at Otovo, living in Oslo, Norway."
      />
      <meta
        property="og:image"
        content="https://s3.eu-north-1.amazonaws.com/rix1.dev/social-image.png"
      />
      <meta
        name="twitter:title"
        content="rix1.dev: Product developer from Norway"
      />
      <meta
        name="twitter:description"
        content="Dev, design, product and hooman. Currently having fun chasing the sun together with @OtovoSolar"
      />
      <meta
        name="twitter:image:src"
        content="https://s3.eu-north-1.amazonaws.com/rix1.dev/social-image.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rix1" />
      <link rel="stylesheet" href="/globals.css" />
    </>
  );
};

export default MetaTags;
