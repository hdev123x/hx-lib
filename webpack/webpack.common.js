const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      stream: require.resolve('readable-stream'),
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist'),
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '../', '.eslintrc'),
    }),
    new NodePolyfillPlugin(),
  ],
  externals: ['child_process'],
};
