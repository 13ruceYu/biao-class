module.exports = {
  mode: 'development',
  entry: {
    get: './get.js',
    set: './set.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  }
}