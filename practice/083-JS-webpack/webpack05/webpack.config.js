module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /\.jpg|jpeg|png|gif$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader']
      }
    ]
  }
}