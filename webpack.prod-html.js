const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

//Production 

module.exports = {
  mode: 'production',

  watchOptions: {
    followSymlinks: true,
  },

  cache: true,

  output: {
    path: path.resolve(__dirname, 'dist/html'),
    clean: true,
  },

  resolve: {
    alias: {
      '@scripts': path.join(__dirname, 'src/js'),
      '@styles': path.join(__dirname, 'src/scss'),
      '@images': path.join(__dirname, 'src/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // path to templates
      test: /\.(html|php|phtml)$/i, // define template extensions to be processed
      entry: 'src/views/',
      data: {
        'html': true,
        'theme': false,
        'dir': '/wp-content/themes/Owl',
        'hash': Math.random(),
      },
      minify: false,
      filename: '[name].html',
      js: {
        // output filename for JS
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename for CSS
        filename: 'css/[name].[contenthash:8].css',
      },
      preprocessor: 'eta',
      preprocessorOptions: {
        async: true, // defaults 'false', wenn is 'true' then must be used `await includeAsync()`
        useWith: true, // defaults 'true', use variables in template without `it.` scope
        //views: path.join(__dirname, 'src/views'), // absolute path to directory that contains templates
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|svg|webp)/,
        type: 'asset',
        generator: {
          filename: 'images/[name][ext]?img-dir',
        },
      },
      {
        test: /\.(woff2|woff)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
};

