'use strict';

const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: path.join(__dirname, 'client/main.js'),
      favicon: path.join(__dirname, 'client/assets/favicon.ico')
    }
  },
  configureWebpack: ({
    resolve: {
      alias: {
        '@': path.join(__dirname, 'client')
      },
      extensions: ['.js', '.vue', '.json']
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        }
      }
    },
    devtool: 'source-map'
  }),
  /* ... other config ... */
  transpileDependencies: ['vuex-persist']
};
