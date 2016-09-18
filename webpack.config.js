const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = 'development';//process.env.NODE_ENV || config.webpack.env;
const IS_DEV_ENV = NODE_ENV === 'development';
const IS_PROD_ENV = NODE_ENV === 'production';
const rootPath = __dirname;

module.exports = {
    target: 'web',
    entry: {
        app: getPath('client', 'AppMain.jsx')
    },
    output: {
        path: getPath('build', 'client'),
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            //optionally add eslint
        ],
        loaders: [
            //optionally add babel
            {test: /\.css$/, loader: ExtractTextPlugin.extract("css?minimize")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("css?minimize!less")},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file?name=assets/[name]-[hash:3].[ext]'}
        ]
    },
    externals: [
        "remote",
        "dialog"
    ],
    devtool: IS_DEV_ENV ? 'eval-source-map' : null,
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('app.css', {allChunks: true})
    ],
    eslint: {
        configFile: '.eslintrc'
    }
};

addExtras();

function initResolves() {
    module.exports.resolve = {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.jsx', '.js']
    };

    module.exports.resolveLoader = {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    };
}

function initBabel() {
    let babelLoader = {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "client"),
        loader: 'babel-loader',
        query: {presets: ['latest', 'react', 'stage-1']}
    };
    module.exports.module.loaders.push(babelLoader);
}

function addMinification() {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}

function copyStaticAssets() {
    let copyPlugin = new CopyWebpackPlugin([
        {from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'libs/font-awesome/css'},
        {from: 'node_modules/font-awesome/fonts', to: 'libs/font-awesome/fonts'},
        {from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'libs/bootstrap/css'},
        {from: 'node_modules/bootstrap/dist/fonts', to: 'libs/bootstrap/fonts'}

    ], {/*OPTIONS*/});

    module.exports.plugins.push(copyPlugin);
}

function addExtras() {
    initResolves();
    if (IS_PROD_ENV) {
        addMinification();
    }

    copyStaticAssets();

    initBabel();
}

function getPath() {
    let args = Array.from(arguments);
    args.unshift(rootPath);
    let result = path.join.apply(this, args);
    return result;
}