const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
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
      entry: 'src/views/',
      js: {
        // output filename for JS
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename for CSS
        filename: 'css/[name].[contenthash:8].css',
      }
    }),

  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|svg)/,
        type: 'asset',
        generator: {
          // save images to file
          filename: 'img/[name].[hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            // inline images < 2 KB
            maxSize: 2 * 1024,
          },
        },
      },
    ],
  },

  // enable HMR with live reload
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};


//Production 

module.exports = {
  mode: 'production',
  watch: false,

  output: {
    path: path.resolve(__dirname, 'dist'),
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
      entry: 'src/views/',
      filename: '[name].php',
      js: {
        // output filename for JS
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename for CSS
        filename: 'css/[name].[contenthash:8].css',
      },
      beforePreprocessor: (content, { resourcePath, data }) => {
        const pattern = /<!--replace:html-->(.+?)<!--replace-->/gs;
        return content.replaceAll(pattern, ''); // modify template content
      },
    }),


  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|svg)/,
        type: 'asset',
        generator: {
          // save images to file
          filename: 'img/[name].[hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            // inline images < 2 KB
            maxSize: 2 * 1024,
          },
        },
      },
    ],
  },
};

