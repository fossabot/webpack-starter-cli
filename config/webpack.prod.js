const SRC = './src';
const defaultConfig = require('./webpack.config');
const path = require('path');
// Import build plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const prodConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', SRC, 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    })
  ]
};

module.exports = Object.assign({}, defaultConfig, prodConfig);