# HTML Webpack Element Plugin

This is a plugin that extends the functionality of the [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) by adding an element to the generated HTML file that React (or other frameworks) can use to render the app.


## Installation
Install the plugin with npm:
```shell
$ npm install html-webpack-element-plugin --save-dev
```

## Basic Use

This adds an element (a div with "app" as the id by default) to the HTML file generated by the HTML Webpack Plugin:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackElementPlugin = require('html-webpack-element-plugin');
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackRootPlugin()
  ],
};
```

The above should add this to your `dist` directory.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

So you can do this without adding a template!:

```javascript
import React from 'react';
import { render } from 'react-dom';

const Hello = () => (
  <h1>Hello!</h1>
);

render(
  <Hello />,
  document.getElementById('app')
);
```

## Syntax

```javascript
new HtmlWebpackElementPlugin()
```

Creates a `<div>` with an id of "app."

```javascript
new HtmlWebpackElementPlugin(object)
```

Takes a configuration object with the following values:

- `tagName`: the type of element created. Defaults to `'div'`.
- `tagId`: the ID given to the created tag. Defaults to `'app'`.

```javascript
new HtmlWebpackElementPlugin(string)
```

If a string is passed it creates a `<div>` with the passed string as the ID.

If anything other than a string or an object is passed it will use the default values and issue a warning in the Webpack build report.

## Examples

This adds an element (a div with "root" as the id) to the HTML file generated by the HTML Webpack Plugin:

Add `<div id="app"></div>` to the created file.
```javascript
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackElementPlugin('root')
  ]
};
```
Add `<main id="application-root"></main>` to the created file.
```javascript
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackElementPlugin({ tagName: 'main', tagId: 'application-root' })
  ]
};
```

## Notes

Plugin originally based on [html-webpack-root-plugin](https://www.npmjs.com/package/html-webpack-root-plugin) by @octalmage and updated for HTML Webpack Plugin 4.
