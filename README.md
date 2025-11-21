# eslint-plugin-no-react-dot

This is an ESLint plugin that disallows the use of `React.` prefix in React code. It encourages developers to import React components and hooks directly, promoting cleaner and more concise code.

> This rules includes an autofixer, but please note that you have to manually add the necessary imports after the autofix is applied.

## Installation

You can install the plugin via npm:

```bash
npm install eslint-plugin-no-react-dot --save-dev

pnpm add -D eslint-plugin-no-react-dot

yarn add -D eslint-plugin-no-react-dot

bun add -d eslint-plugin-no-react-dot
```

## Usage

Add `no-react-dot` to the plugins section of your ESLint configuration file and enable the rule:

```json
{
  "plugins": ["no-react-dot"],
  "rules": {
    "no-react-dot/no-react-dot": "error"
  }
}
```

## Rule Details

This rule disallows the use of `React.` prefix. For example, the following patterns are considered violations:

```javascript
const element = React.createElement('div', null, 'Hello World');
const [state, setState] = React.useState(0);
```

Instead, you should import the necessary functions directly:

```javascript
import { createElement, useState } from 'react';
const element = createElement('div', null, 'Hello World');
const [state, setState] = useState(0);
```

## License

This project is licensed under the [MIT License](LICENSE).