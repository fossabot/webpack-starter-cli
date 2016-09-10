'use strict';

//port you want to run webpack on
var SERVER_PORT = 12345;

//source folder
var SRC = './src';

//dist/build folder
var DIST = './dist';

//entry file relative to SRC-path
var ENTRY_FILE = 'index.js';

//inject build/dist files into this template
var INJECT_FILE = '/index.html';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var config = {

  //entry point for the bundle
  //if given a string: loads the module,
  //if given an array: all modules will be loaded, the last one will be exported
  //if given an object: chunks will be created,
  //          the key is the chunkName & you can load arrays or strings.
  entry: {
    app: path.join(__dirname, SRC, ENTRY_FILE),
  },

  //options for the compiled output of the bundle
  output: {
    path: DIST,
    filename: '[name].[hash].js',
  },

  //options for the development server
  devServer: {
    contentBase: SRC,
    stats: 'all',
  },

  //enable source-mapping
  devtool: 'inline-source-map',

  module: {
    preLoaders: [],

    //add in loaders for additional files to load
    //e.g. JSONLoader
    loaders: [{
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015'],
      },
    }, {
      test: /\.html$/,
      loader: 'raw',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      exclude: /node_modules/,
    },],
  },

  //add plugins to the compiler
  plugins: [
    new ExtractTextPlugin('[name].[hash].css', {
      disable: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC, INJECT_FILE),
      inject: 'body',
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:8080/ during development,
      // ./dist directory is being served
      host: 'localhost',
      port: 9000,

      //server: { baseDir: ['dist'] },
      proxy: 'http://localhost:8080',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin({
      name: 'commons',
      filename: 'commons.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
  ],

  //fallback dependencies to node_modules
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },

  //resolve root alias
  //cfr. https://webpack.github.io/docs/configuration.html#resolve-alias
  resolve: {
    alias: {
      root: path.join(__dirname, SRC),
    },
  },
};

module.exports = config;
