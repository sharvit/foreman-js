import { configure } from '@storybook/react';

const req = require.context(
  `${process.env.CWD}/webpack`,
  true,
  /\.stories\.js$/
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);