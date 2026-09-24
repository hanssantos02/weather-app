const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    // 'auto' keeps assets working on GitHub Pages project sites
    // (e.g. username.github.io/repo-name/) without hardcoding a base path.
    // Override with PUBLIC_PATH env var if you need a fixed base, e.g.:
    // PUBLIC_PATH=/repo-name/ npm run build
    publicPath: process.env.PUBLIC_PATH || 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // Images: inlined below 8 KB, emitted as files above it
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 },
        },
      },
      {
        // Fonts are always emitted as files
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './public/favicon.svg',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: '.',
          globOptions: {
            // favicon is injected by HtmlWebpackPlugin, don't duplicate it
            ignore: ['**/favicon.svg'],
          },
        },
      ],
    }),
  ],
};
