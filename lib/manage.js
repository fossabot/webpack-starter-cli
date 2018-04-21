const fs = require('fs');
const path = require('path');
const CURRENT_PATH = process.cwd();
const ADDITIONAL_CONFIG_PATH = path.resolve(CURRENT_PATH, './vlees.config.json')

function hasAdditionalConfig() {
  return fs.existsSync(ADDITIONAL_CONFIG_PATH);
}

function getAdditionalConfig() {
  if (hasAdditionalConfig()) {
    return require(ADDITIONAL_CONFIG_PATH);
  }

  return {};
}

function getAdditionalConfigPath() {
  return ADDITIONAL_CONFIG_PATH;
}

module.exports = {
  getAdditionalConfig: getAdditionalConfig,
  getAdditionalConfigPath: getAdditionalConfigPath,
  hasAdditionalConfig: hasAdditionalConfig
};