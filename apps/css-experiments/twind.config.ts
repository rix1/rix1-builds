import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      janson: "Janson Text",
    },
  },
  preflight: {
    // Import external stylesheet
    // "@import":
    //   `url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap')`,
    // Declare font face
    "@font-face": [
      {
        fontFamily: "Janson Text",
        fontWeight: "400",
        src: 'url(/janson.woff2) format("woff")',
      },
    ],
  },
} as Options;
