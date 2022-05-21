/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ui']);
const withContentlayer = require('next-contentlayer').withContentlayer;

module.exports = withTM(
  withContentlayer({
    reactStrictMode: true,
  }),
);
