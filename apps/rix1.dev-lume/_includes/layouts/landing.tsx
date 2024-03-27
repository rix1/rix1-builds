type Project = {
  title: string;
  when: string;
  status: "broken" | "live" | "unfinished";
  description: string;
  link: string;
  repo?: string;
};

function markdownToHtmlLinks(markdown: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return markdown.replace(regex, '<a href="$2">$1</a>');
}

function compareFn(a: Project, b: Project) {
  return Number(b.when) - Number(a.when);
}

export default ({ comp, title, children, index }: Lume.Data) => {
  const proseClasses = ["prose", "lg:prose-xl"].join(" ");

  return (
    <html>
      <head>
        <comp.MetaTags />

        <title>{title}</title>
      </head>
      <body
        className={`relative mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8 ${proseClasses}`}
      >
        <main className="grid items-end gap-4 md:grid-cols-2">
          {children}
          <div className="mb-[1.2em] font-[1.25rem]">
            <div className="relative ">
              <div
                className="not-prose mx-auto my-0 p-0 md:[--image-size:400px]"
                id="blobby-avatar"
              />
              <div id="blob"></div>
            </div>
            <comp.ShareIcons />
          </div>
        </main>

        <section className="mt-24">
          <h2 className="mb-8">{index.repos.length} of my latest creations:</h2>
          <div className="grid grid-flow-row grid-cols-2 gap-6 md:grid-cols-3 lg:grid-rows-3">
            {(index.repos as Project[]).sort(compareFn).map((project) => (
              <article key={project.title} className="mb-4 max-w-xs">
                <p className="not-prose my-0 inline-flex flex-wrap items-baseline gap-2">
                  <a href={project.link} className="font-semibold underline">
                    {project.title}
                  </a>
                  &middot;
                  <span className="rounded-full text-sm">{project.when}</span>
                </p>
                <p
                  className="not-prose my-0 block"
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtmlLinks(project.description),
                  }}
                />
                {project.repo && (
                  <div className="self-end">
                    <a
                      href={project.repo}
                      className="clear text-base no-underline"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#db2777"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 inline-block align-middle"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                      Repository
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
        <div id="blur"></div>
      </body>
    </html>
  );
};
