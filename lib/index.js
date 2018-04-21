#!/usr/bin/env node
const { omitBy, isNull, isUndefined } = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const constructConfig = require('./webpack.config');
const currentPath = process.cwd();
const { hasAdditionalConfig, getAdditionalConfig, getAdditionalConfigPath } = require('./manage');
const additionalConfig = getAdditionalConfig();
const DIST = 'dist';

if (hasAdditionalConfig()) {
  console.log(chalk.black.bgYellow(`Using additional config ${getAdditionalConfigPath()}`));
}

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'No command specified')
  .command(
    'serve',
    'Run a live-reloading server with frontend',
    function (yargs) {
      return yargs
        .option('mode', {
          alias: 'mode',
          default: 'development'
        })
        .option('entry')
        .option('port', {
          default: 9000
        })
        .option('host', {
          default: '127.0.0.1'
        });
    },
    serve)
  .command(
    'build',
    'Build the application',
    function (yargs) {
      return yargs
        .option('entry');
    },
    build
  )
  .version()
  .alias('v', 'version')
  .strict(true)
  .argv;

function decorateArgs (args) {
  // omit the empty arguments so they don't override the additionalConfig
  const noEmptyArgs = omitBy(args, (value) => {
    return isNull(value) || isUndefined(value);
  });

  return Object.assign({}, additionalConfig, noEmptyArgs);
}

function serve(args) {
  let config = constructConfig(decorateArgs(args));

  const devServerConfig = {
    contentBase: path.join(currentPath, DIST),
    clientLogLevel: 'info',
    hot: true
  };

  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, devServerConfig);

  server.listen(9400, args.host, () => {
    console.log(`Starting server on ${args.host}:${9400}`);
  });
}

function build(args) {  
  const options = Object.assign({}, decorateArgs(args), { mode: 'production' });
  let config = constructConfig(options, additionalConfig);
  const compiler = webpack(config);

  compiler.run((err) => {
    if (err) {
      console.log(chalk.red('Something went wrong, check the error below:'));
      console.log(err);
      return;
    }

    console.log(chalk.white.bgGreen('Built the application!'));
  });
}
