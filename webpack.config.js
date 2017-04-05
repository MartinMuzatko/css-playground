var webpack = require('webpack')
var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path');

module.exports = {

    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js',
    }, // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        path: path.resolve(__dirname, ''), // string
        filename: "[name].js", // string
        publicPath: "/", // string
    },

    module: {
        // configuration regarding modules

        rules: [
            //{ test: /\.js$/, loader: 'source-map', enforce: 'pre' },
            { test: /\.html$/, loader: 'riotjs' },
            { test: /\.js|\.html$/, loader: 'babel', options: { presets: 'es2015-riot' }},
            //{ test: /\.(jpe?g|png|gif|mp4)$/i, loader: 'file?name=img/[name].[ext]'},
            //{ test: /fonts\/.*\.(woff|eot|svg|otf|ttf)$/i, loader: `file?name=fonts/[name].[ext]`},
            { test: /\.less$/, loader: ['style','css','less']},
            { test: /\.json$/, loader: 'json'},
            { test: /\.html$/, loader: 'riotjs' },
        ],

    },

    resolveLoader: {
        moduleExtensions: ["-loader"]
    },

    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.ProvidePlugin({
            riot: 'riot',
            noUiSlider: 'nouislider'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
    ],

    devtool: "#source-map", // enum

    context: __dirname, // string (absolute path!)

    target: "web", // enum

    stats: { //object
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        //hash: true,
    },

    devServer: {

        contentBase: path.join(__dirname, ''), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        //hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
        // ...
    },
}
