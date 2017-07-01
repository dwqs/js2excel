/**
 * Created by pomy on 02/07/2017.
 */

'use strict';

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "example"),
    entry: path.resolve(__dirname, './example/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './example/dist')
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
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        })
    ]
};