/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  presets: [require('config/tailwind.config')],
};
