const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');
const mergeWebpack = require('webpack-merge');

const SRC = './src';
const DIST = './dist';
const PATH = process.cwd();
const { getAdditionalConfig } = require('./manage');
const additionalConfig = getAdditionalConfig();

module.exports = (options) => {
  options = decorateOptions(options);

  let config = {

    entry: [
      path.resolve(SRC, 'index.js')
    ],

    output: {
      filename: '[name].[hash].js',
      path: path.join(PATH, DIST)
    },

    mode: options.mode,

    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'node_modules')
      ],
      extensions: [ '.js', '.jsx' ],
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'node_modules')
      ]
    }
  };

  config = Object.assign({}, config, constructLoaders());
  config = Object.assign({}, config, constructPlugins(options));

  return mergeWebpack(config, (additionalConfig.webpack || {}));
};

function decorateOptions (options = {}) {
  options.mode = options.mode || 'development';
  return options;
}

function constructLoaders() {
  const rules = [ {
    test: /\.html$/,
    loader: require.resolve('html-loader')
  }, {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [ {
      loader: require.resolve('style-loader')
    }, {
      loader: require.resolve('css-loader')
    }, {
      loader: require.resolve('sass-loader'),
      options: {
        outputStyle: 'compressed',
        sourceMap: true,
        sourceMapContents: true
      }
    }
    ]
  }, {
    test: /\.(jpe?g|png|gif|svg|mp3)$/i,
    loaders: [
      'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      {
        loader: 'image-webpack-loader',
        query: {
          imagemin: {
            bypassOnDebug: true,
            optimizationLevel: 1,
            interlaced: false
          }
        }
      }
    ]
  }, {
    test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
    loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
  } ];

  const jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [ {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('@babel/preset-env')
        ]
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
