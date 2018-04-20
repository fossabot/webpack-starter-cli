const _ = require('lodash');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

const SRC = './src';
const DIST = './dist';
const PATH = process.cwd();

module.exports = (options) => {
  options = decorateOptions(options);

  let config = {
    entry: [
      path.resolve(PATH, SRC, options.entry)
    ],

    output: {
      filename: '[name].[hash].js',
      path: path.join(PATH, DIST)
    },

    mode: options.mode,

    resolve: {
      extensions: [ '.js', '.jsx' ]
    }
  };

  config = Object.assign({}, config, constructLoaders(options));
  config = Object.assign({}, config, constructPlugins(options));
  return config;
};

function decorateOptions (options = {}) {
  options.entry = options.entry || 'index.js';
  options.mode = options.mode || 'development';
  return options;
}

function constructLoaders(options) {
  const rules = [ {
    test: /\.html$/,
    loader: 'html-loader'
  }, {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [ {
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'sass-loader',
      options: {
        outputStyle: 'compressed',
        sourceMap: true,
        sourceMapContents: true
      }
    }
    ]
  } ];

  let babelPresets = _.uniq(
    (options.babelPresets || []).concat([
      '@babel/preset-env'
    ])
  );

  const jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [ {
      loader: 'babel-loader',
      options: {
        presets: babelPresets
      }
    } ]
  };

  rules.push(jsLoader);

  return {
    module: {
      rules
    }
  };
}

function constructPlugins(options) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(PATH, SRC, 'index.html')
    })
  ];

  if (options.mode === 'development') {
    const browserSyncPlugin = new BrowserSyncWebpackPlugin({
      // Don't show any output from BrowserSync
      logLevel: 'silent',
      port: options.port,
      proxy: 'http://localhost:9400'
    });
  
    plugins.push(browserSyncPlugin);
  }

  return { plugins };
}
