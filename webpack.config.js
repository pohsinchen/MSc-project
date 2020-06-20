const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        alias: {
            three$: 'three/build/three.min.js',
            'three/.*$': 'three',
        },
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            title: 'Project',
        }),
        new webpack.ProvidePlugin({
            THREE: 'three'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
                'file-loader',
            ],
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader',
            ],
        }, {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader',
            ],
        }, {
            test: /\.xml$/,
            use: [
                'xml-loader',
            ],
        }, {
            test: /\.(gltf|glb|bin)$/,
            use: [
                'file-loader',
            ],
        }, ],
    },
};