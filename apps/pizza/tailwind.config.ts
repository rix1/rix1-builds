import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rza: ["RzaLight", "serif"],
      },
    },
  },
} satisfies Config;
