const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const {
  override,
  addWebpackPlugin,
} = require("customize-cra");

module.exports = override(
  // https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
  addWebpackPlugin(new MonacoWebpackPlugin()),
);