"use strict";

const path = require("path");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        app: "./server/startServer.js"
    },
    output: {
        path: "./build/server",
        filename: 'serverBundle.js'
    },
    resolve: {
        extensions: ["", ".js"]
    },
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: [
                        'transform-async-to-generator',
                        'transform-es2015-modules-commonjs'
                    ]
                }
            }
        ]
    },
    externals: [nodeExternals()],
    devtool: "source-map"
};