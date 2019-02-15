const Html = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.common.js'), {
  mode: 'production',
  plugins: [
    new Clean(['./dist']),
    new Html({
      template: './tpl.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
  ]
})