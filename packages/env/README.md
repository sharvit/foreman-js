# @theforeman/env

> Development environment for foreman core and plugins

[![Package Version](https://img.shields.io/npm/v/@theforeman/env.svg?style=flat-square)](https://www.npmjs.com/package/@theforeman/env)
[![Downloads Status](https://img.shields.io/npm/dm/@theforeman/env.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@theforeman/env&from=2016-04-01)
[![Build Status: Linux](https://img.shields.io/travis/theforeman/foreman-js/master.svg?style=flat-square)](https://travis-ci.org/theforeman/foreman-js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## What you get with this project

- `@theforeman/env/babel` - Adds theforeman babel dev configuration to your project.
- `@theforeman/env/test` -  Adds theforeman testing tools to you project.
- `@theforeman/env/stories` - Adds theforeman storybook tools to you project.

## Installation

```sh
npm install --save-dev @theforeman/env
```

### Install `@theforeman/env/babel`

1. To work with `babel` first you need to install `@theforeman/builder` since it contain the production `babel` configurations.

```bash
npm install --save-dev `@theforeman/builder`
```

2. Create a `.babelrc.js` file in your project root with the following content.

```js
module.exports = {
  presets: ['@theforeman/builder/babel'],
};

```


> `@theforeman/builder/babel` will automatically load `@theforeman/env/babel` for none production environments.

### install `@theforeman/env/test`

1. Add this to the `test` in `packge.json`:
```json
{
  "test": "tfm-test"
}
```
2. create a `test_helper.js` under `/webpack` for extending global mocks if needed

## Stories

### What are stories?

Stories are a playground allow you to develop, document and demo your components in isolation.
It uses [storybook](https://storybook.js.org/) and some tailor made configurations for foreman plugins.

### Write a story

To create a story for a given component `MyComponent`, first create a story with the file name `MyComponent.stories.js` next to `MyComponent.js`.
The `tfm-stories` will search for files with the `.stories.js` extention.

```
•
└── webpack
    └── components
        └── MyComponent
            ├── MyComponent.js
            └── MyComponent.stories.js
```

```js
// MyComponent.js
import React from 'react';

const MyComponent = ({ opened, setOpened }) => (
  <button onClick={() => setOpened(!opened)}>
    {opened ? 'OPEN' : 'CLOSE'}
  </button>
);

export default MyComponent;

// MyComponent.stories.js
import React from 'react';
import { storiesOf, action, withKnobs, boolean } from '@theforeman/env/stories';
import MyComponent from './MyComponent';

const stories = storiesOf(
  'MyComponent|MyComponent/MyComponent',
  module
).addDecorator(withKnobs);

stories.add('MyComponent', () => (
  <MyComponent setOpened={action('setOpened')} opened={boolean('opened')} />
));

```

### Run stories development server

```bash
tfm-stories [options]
```

```
Options:
  -V, --version                output the version number
  --plugin                     Use for a foreman-plugin
  -p, --port <number>          Port to run Stories (default: 6006)
  -s, --setup-file <filename>  Stories global setup file.
  -h, --help                   output usage information
```

### Build stories

```bash
tfm-build-stories [options]
```

```
Options:
  -V, --version                output the version number
  --plugin, --plugin           Use for a foreman-plugin
  -s, --setup-file <filename>  Stories global setup file.
  -o, --output-dir <dir-name>  Directory where to store built files
  -w, --watch                  Enable watch mode
  -q, --quiet                  Suppress verbose build output
  -h, --help                   output usage information
```

## Contributing

Please checkout the [`contributing.md`](../../contributing.md), the [`roadmap.md`](../../roadmap.md) and the open issues.
