import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import reading_info from "lume/plugins/reading_info.ts";
import sitemap from "lume/plugins/sitemap.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import typography from "npm:@tailwindcss/typography";
import jsx from "lume/plugins/jsx.ts";

const site = lume();

site.use(code_highlight());
site.use(date());
site.use(favicon());
site.use(feed());
site.use(lightningcss());
site.use(reading_info());
site.use(sitemap());
site.use(jsx());
site.use(
  tailwindcss({
    options: {
      plugins: [typography],
    },
  }),
);
site.use(postcss());

site.copy("assets");

export default site;
