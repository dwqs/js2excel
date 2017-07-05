/**
 * Created by pomy on 02/07/2017.
 */

'use strict';

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CheckerPlugin } = require('awesome-typescript-loader')

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
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            }
        ]
    },

    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new CheckerPlugin(),
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