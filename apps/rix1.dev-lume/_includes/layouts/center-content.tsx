export default ({ comp, title, alignment, children, index }: Lume.Data) => {
  return (
    <html>
      <head>
        <comp.MetaTags />

        <title>{title}</title>
      </head>

      <body className="relative min-h-screen mt-12 pb-40">
        <main
          className={[
            "px-4 sm:px-6 lg:px-8 mx-auto prose lg:prose-xl",
            alignment === "center" ? "text-center" : "text-left",
          ].join(" ")}
        >
          <h1 className="mb-0">{title}</h1>
          {children}
          <comp.ShareIcons withBlob />
        </main>

        <div id="blur"></div>
      </body>
    </html>
  );
};
