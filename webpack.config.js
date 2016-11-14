var path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    cordovaLib = require('cordova').cordova_lib,
    deepExtend = require('deep-extend'),
    CSON = require('cson'),
    projectConfig = deepExtend(CSON.requireFile('./config/config.default.cson'), CSON.requireFile('./config/config.cson')),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(libPath, 'index.coffee'),
    output: {
        path: wwwPath,
        filename: 'bundle-[hash:6].js'
    },
    module: {

    noParse: [/autoit.js/],

        loaders: [{
            test: /[\/]highlight\.js$/,
            loader: 'expose?hljs'
        }, {
            test: /[\/]imgcache\.js$/,
            loader: 'expose?ImgCache'
        }, {
            test: /[\/]ionic\.js$/,
            loader: 'exports?ionic' // For non commonJs
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: "ng-annotate?add=true!babel"
        }, {
            test: /\.html$/,
            loader: 'html?-removeRedundantAttributes'
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.cson$/,
            loader: "cson"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.coffee$/,
            loader: "ng-annotate?add=true!coffee"
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer!sass"
        }, {
            test: [/Roboto\.ttf/, /Roboto\.woff/, /Roboto\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
       }, {
            test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.cson', '.scss', '.coffee', '.html'],
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'bower_components')
        ],
        moduleDirectories: [
            'bower_components',
            'node_modules'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            appVersion: getAppVersion(),
            template: path.join(libPath, 'index.html')
        }),
        new webpack.ContextReplacementPlugin(/moment\/locale$/, getRegexAutorizedLanguages()),
        // new webpack.IgnorePlugin(getRegexAutorizedProgramationLanguages()),
        new webpack.DefinePlugin({
            IS_PROD: false,
            IS_TECH: (projectConfig.syntaxHighlighter.enabled)
        })
    ]
};

function getRegexAutorizedLanguages() {
    return new RegExp(projectConfig.translation.displayed.join('|'));
}

// function getRegexAutorizedProgramationLanguages() {
//     var completeList = [];
//     return new RegExp(_.intersection(completeList, projectConfig.syntaxHighlighter.languages).join('|'));
// }

function getAppVersion() {
    var config = new cordovaLib.configparser(__dirname + '/config.xml');
    return config.version();
}
