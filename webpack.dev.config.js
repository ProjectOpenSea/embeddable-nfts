const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'codemirror'), path.join(__dirname, 'dist')],
    compress: true,
    port: 9000,
    publicPath: '/dist'
  },
  entry: './src/nft-card.ts',
  output: {
    filename: 'nft-card.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'example/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff2|png)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  }
}
