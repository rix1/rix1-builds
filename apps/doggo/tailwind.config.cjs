/** @type {import('tailwindcss').Config} */
module.exports = {
  // content is handled by the shared config!
  // content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require('config/tailwind.config')],
  theme: {
    extend: {},
  },
  plugins: [],
};
