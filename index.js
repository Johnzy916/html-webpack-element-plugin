const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const constants = require('./constants'); // eslint-disable-line

const defaultTagName = '<div>';
const defaultTagId = 'app';
const configWarning = 'HtmlWebpackElementPlugin: Invalid configuration. Using default options.';

class HtmlWebpackElementPlugin {
  constructor(options) {
    let pluginOptions = options;
    if (typeof options !== 'object') {
      let tagId;
      if (typeof options === 'string') {
        tagId = options;
      } else if (typeof options !== 'undefined') {
        this.configWarning = configWarning;
      }
      pluginOptions = {
        tagName: defaultTagName,
        tagId: tagId || defaultTagId,
      };
    }

    this.tagName = pluginOptions.tagName || defaultTagName;
    this.tagId = pluginOptions.tagId || defaultTagId;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('html-webpack-element-plugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'html-webpack-element-plugin',
        (data, cb) => {
          const { html } = data;
          const index = html.indexOf('<body>') + '<body>'.length;
          const [first, last] = [html.slice(0, index), html.slice(index, html.length)];
          const newData = {
            html: `${first}<${this.tagName} id="${this.tagId}"></${this.tagName}>${last}`,
          };

          cb(null, newData);
        },
      );
    });
  }
}

module.exports = HtmlWebpackElementPlugin;
