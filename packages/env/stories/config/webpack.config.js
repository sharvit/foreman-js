const webpack = require('webpack');
const applyWebpackRules = require('./webpack/webpack.config.rules');
const applyWebpackResolve = require('./webpack/webpack.config.resolve');
const applyWebpackVendor = require('./webpack/webpack.config.vendor');

module.exports = async ({ config, mode }) => {
  applyWebpackResolve({ config });
  applyWebpackRules({ config });
  applyWebpackVendor({ config, mode });

  if (process.env.STORIES_SETUP_FILE) {
    config.entry = [process.env.STORIES_SETUP_FILE, ...config.entry];
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('storybook'),
        CWD: JSON.stringify(process.cwd()),
      },
    })
  );

  config.plugins.push(
    new webpack.ContextReplacementPlugin(
      /intl\/locale-data\/jsonp/,
      new RegExp(`/(en)$`)
    )
  );
  config.plugins.push(
    new webpack.ContextReplacementPlugin(
      /react-intl\/locale-data/,
      new RegExp(`/(en)$`)
    )
  );

  config.watchOptions = {
    poll: true,
  };

  return config;
};
