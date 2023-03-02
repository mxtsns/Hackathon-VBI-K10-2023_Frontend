const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: require.resolve("path-browserify"),
    buffer: require.resolve("buffer"),
  });
  config.resolve.fallback = fallback;
  // config.plugins = (config.plugins || []).concat([
  //   new webpack.ProvidePlugin({
  //     process: "process/browser",
  //   }),
  //   new NodePolyfillPlugin(),
  // ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
