# @theforeman/stories

> Documentation library for the foreman project

[![Package Version](https://img.shields.io/npm/v/@theforeman/stories.svg?style=flat-square)](https://www.npmjs.com/package/@theforeman/stories)
[![Downloads Status](https://img.shields.io/npm/dm/@theforeman/stories.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@theforeman/stories&from=2016-04-01)
[![Build Status: Linux](https://img.shields.io/travis/theforeman/foreman-js/master.svg?style=flat-square)](https://travis-ci.org/theforeman/foreman-js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## What are stories?

Stories are a playground allow you to develop, document and demo your components in isolation.
It uses [storybook](https://storybook.js.org/) and some tailor made configurations for foreman plugins.

## Writing a story

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
import { storiesOf, action, withKnobs, boolean } from '@theforeman/stories/stories';
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
