type SEOProps = {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  image: {
    src: string;
  };
};

const SEO = ({ title, description, keywords, siteUrl, image }: SEOProps) => {
  const img = image.src.startsWith("https")
    ? image.src
    : `${siteUrl}${image.src}`;
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={siteUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:site" content="@rix1" />
      <meta name="twitter:title" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:description" content={description} />
      <meta property="og:image:height" content="418" />
      <meta property="og:image:width" content="800" />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Pizza slider by @rix1" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      {/* Other stuff */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default SEO;
