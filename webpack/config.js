var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
var deepExtend = require('deep-extend');
var cordovaLib = require('cordova').cordova_lib;
var CSON = require('cson');

var defaultConfig = CSON.requireFile('./config/config.default.cson');
var configOverwrite = CSON.requireFile('./config/config.cson');

const RawConfig = deepExtend(defaultConfig, configOverwrite);

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_GENERATE_SOURCE_MAP ? process.env.IONIC_SOURCE_MAP_TYPE : '',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.cson$/,
        use: ['file-loader?name=/i18n/[name].json', 'strip-module-export-loader', 'cson-loader'],
        include: path.join(__dirname, '..', 'src', 'i18n')
      },
      {
        test: /\.cson$/,
        use: 'cson-loader',
        exclude: path.join(__dirname, '..', 'src', 'i18n')
      },
      {
        //test: /\.(ts|ngfactory.js)$/,
        test: /\.ts$/,
        use: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(getAppVersion()),
      __DEV__: process.env.IONIC_ENV === 'dev',
      __PROD__: process.env.IONIC_ENV === 'prod'
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

function getAppVersion() {
  var config = new cordovaLib.configparser(path.join(__dirname, '..', 'config.xml'));
  return config.version();
}