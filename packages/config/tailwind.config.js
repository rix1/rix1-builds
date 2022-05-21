const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        athelas: ['Athelas', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
