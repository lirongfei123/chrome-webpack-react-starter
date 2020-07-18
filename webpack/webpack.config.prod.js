const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  stats: 'errors-only',
  bail: true,
  plugins: [
    new Webpack.DefinePlugin({
      'baseUrl': JSON.stringify('https://eng.qianrong.net')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
    ]
  }
});
