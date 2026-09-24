const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    // `webpack serve` is powered by webpack-dev-server.
    // (The old `webpack-serve` package is deprecated — this is its replacement.)
    static: './dist',
    hot: true,
    open: true,
    port: 8080,
    historyApiFallback: true,
    client: {
      overlay: { errors: true, warnings: false },
    },
  },
});
