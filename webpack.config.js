'use strict';

// Modules
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  config.entry = {
    //change this if your entry is different
    app: './src/index.js'
  };

  config.resolve = {
    root: path.resolve('./src')
  };

  config.output = {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    //publicPath: isProd ? '/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  config.devtool = 'source-map';



  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"],
      exclude: /node_modules/
    }]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  // Reference: https://github.com/ampedandwired/html-webpack-plugin
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),

    new BrowserSyncPlugin({
      //webpack-dev-server will run on 8080 which will be the proxy here.
      host: 'localhost',
      port: 9000,
      proxy: 'http://localhost:8080'
    }, {
      reload: false
    }),

		new ExtractTextPlugin('[name].[hash].css')

  );

  // Add build specific plugins
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  );

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    stats: 'minimal'
  };

  config.resolve = {
    alias: {
      'root': path.resolve(__dirname, "./src")
    }
  }

  return config;
}();
