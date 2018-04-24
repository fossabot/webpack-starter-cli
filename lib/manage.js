const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const CURRENT_PATH = process.cwd();
const ADDITIONAL_CONFIG_PATH = path.resolve(CURRENT_PATH, './starter.config.js')

function hasAdditionalConfig() {
  return fs.existsSync(ADDITIONAL_CONFIG_PATH);
}

function getAdditionalConfig() {
  if (!hasAdditionalConfig()) {
    return {};
  }

  const additionalConfig = require(ADDITIONAL_CONFIG_PATH);

  if (_.isFunction(additionalConfig)) {
    return additionalConfig();
  }

  return additionalConfig;
}

function getAdditionalConfigPath() {
  return ADDITIONAL_CONFIG_PATH;
}

module.exports = {
  getAdditionalConfig: getAdditionalConfig,
  getAdditionalConfigPath: getAdditionalConfigPath,
  hasAdditionalConfig: hasAdditionalConfig
};