import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        janson: "Janson Text",
        comfortaa: "Comfortaa",
        pressStart: `'Press Start 2P', cursive`,
      },
    },
  },
  preflight: {
    // Import external stylesheet
    "@import":
      `url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`,

    // Declare font face
    "@font-face": [
      {
        fontFamily: "Janson Text",
        fontWeight: "400",
        src: 'url(/janson.woff2) format("woff")',
      },
      {
        fontFamily: "Comfortaa",
        fontWeight: "700",
        src: 'url(/Comfortaa-Bold.ttf) format("ttf")',
      },
    ],
  },
} as Options;
