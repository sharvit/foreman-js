const path = require('path');
const {
  cwdWebpack,
  vendorCoreModulesPath,
  foremanReactPath,
} = require('./paths');

module.exports = async ({ config }) => {
  const include = process.env.IS_FOREMAN_PLUGIN
    ? [cwdWebpack, foremanReactPath]
    : [cwdWebpack];

  // find the javascript rule
  const jsRule = config.module.rules.find(rule =>
    'some-file.js'.match(rule.test)
  );
  jsRule.exclude = /node_modules/;
  jsRule.include = include;
  jsRule.use = [
    {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [require.resolve('@theforeman/builder/babel')],
      },
    },
  ];

  // Stories source code loader
  config.module.rules.push({
    test: /\.stories\.js$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          prettierConfig: {
            parser: 'babel',
          },
        },
      },
    ],
    enforce: 'pre',
  });

  // scss loader
  config.module.rules.push({
    test: /\.scss$/,
    include,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('sass-loader'),
        options: {
          includePaths: [
            // teach webpack to resolve patternfly dependencies
            path.resolve(vendorCoreModulesPath, 'patternfly', 'dist', 'sass'),
            path.resolve(
              vendorCoreModulesPath,
              'bootstrap-sass',
              'assets',
              'stylesheets'
            ),
            path.resolve(
              vendorCoreModulesPath,
              'font-awesome-sass',
              'assets',
              'stylesheets'
            ),
          ],
        },
      },
    ],
  });

  return config;
};
