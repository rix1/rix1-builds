/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['rix-ui']);
const withContentlayer = require('next-contentlayer').withContentlayer;

module.exports = withContentlayer(
  withTM({
    reactStrictMode: true,
  }),
);
