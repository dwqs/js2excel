/**
 * Created by pomy on 01/07/2017.
 */

'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './index.js'),

    output: {
        filename: 'js2excel.min.js',
        path: path.resolve(__dirname, './dist'),
        library: 'js2excel',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    resolve:{
        extensions:[".js"],
        modules: [path.join(__dirname, './node_modules')]
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            comments: false,
            sourceMap: false,
            mangle: true
        })
    ]
};

