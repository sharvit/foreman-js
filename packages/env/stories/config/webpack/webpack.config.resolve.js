const {
  foremanReactPath,
  cwdModulesPath,
  foremanModulesPath,
  envModulesPath,
  vendorCoreModulesPath,
} = require('./paths');

module.exports = async ({ config }) => {
  // foremanReact alias
  config.resolve.alias.foremanReact = foremanReactPath;

  // node_modules resolver
  config.resolve.modules = [
    envModulesPath,
    vendorCoreModulesPath,
    cwdModulesPath,
  ];

  if (process.env.IS_FOREMAN_PLUGIN) {
    config.resolve.modules = [...config.resolve.modules, foremanModulesPath];
  }

  return config;
};
