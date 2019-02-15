module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: __dirname + '/dist',
  },
}