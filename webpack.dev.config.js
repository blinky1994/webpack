const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { 
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'index.html', // name of the index file that should be used
            writeToDisk: true //  indicates whether files should be written to disk  
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*', // match all files in output path
                path.join(process.cwd(), 'build/**/*') // Extra folder
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: [ 'hello-world' ],
            title: 'Hello World',
            template: 'src/page-template.hbs',
            description: 'This is hello world',
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: [ 'kiwi' ],
            title: 'Kiwi',
            template: 'src/page-template.hbs',
            description: 'This is kiwi',
            minify: false,
        })
    ]
};
