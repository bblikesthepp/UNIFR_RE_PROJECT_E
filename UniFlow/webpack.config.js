const path = require('path');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production' d
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true, 
  },
  resolve: {
    extensions: ['.ts', '.js'], 
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional: Alias for cleaner imports
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/, // for Sass/SCSS files
        use: [
          'style-loader', // injects CSS into the DOM
          'css-loader',   // resolves CSS imports
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: [path.resolve('./node_modules')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        type: 'asset/resource', 
      },
    ],
  },
  plugins: [
    new AureliaPlugin(), // configures Aurelia for Webpack
    new HtmlWebpackPlugin({
      template: './src/index.html', // entry HTML template
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true, // hxandles SPA routes
  },
};
