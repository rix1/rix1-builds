module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  tailwindConfig: './apps/site/tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')],
};
