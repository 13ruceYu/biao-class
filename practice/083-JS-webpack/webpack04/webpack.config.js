module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        }
      ],
    }]
  }
}