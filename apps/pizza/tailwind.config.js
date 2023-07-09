/** @type {import('https://esm.sh/tailwindcss@3.1.8').Config} */

module.exports = {
  content: [
    "./routes/**/*.{tsx,ts}",
    "./islands/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        rza: ["RzaLight", "serif"],
      },
    },
  },
  plugins: [],
};
