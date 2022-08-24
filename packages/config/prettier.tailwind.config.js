const baseConfig = require('./prettier.config');

module.exports = {
  ...baseConfig,
  tailwindConfig: 'tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')],
};
