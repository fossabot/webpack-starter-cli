const SRC = './src';
const DIST = './dist';
const path = require('path');

// The default configuration
// Properties in the default config will be overwritten by the resolved config
let defaultConfig = {
  entry: ['babel-polyfill', path.join(__dirname, SRC, 'index.jsx')],

  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, DIST)
  },

  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['latest', 'react']
        }
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [{
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
    }]
  }
};

module.exports = (env) => {
  // Resolve the config from ARGS
  let resolvedConfig = require(path.join(__dirname, env));

  // Merge the default config with the resolved config and export it
  return Object.assign({}, defaultConfig, resolvedConfig);
};
