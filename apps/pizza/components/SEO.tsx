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
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={siteUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.src} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={
          image.src.startsWith("https") ? image.src : `${siteUrl}${image.src}`
        }
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      {/* Other stuff */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default SEO;
