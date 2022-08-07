const withTM = require("next-transpile-modules")(["rix-ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
