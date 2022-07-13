const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//获取路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: 'development',
    entry: {
        index: './src/pages/index/index.js'
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    //调试时显示源代码
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        //自动补全（可以省略）的扩展名
        extensions: ['.js'],
        //路径别名
        alias: {
            api: resolve('src/api'),
            fonts: resolve('src/assets/fonts'),
            images: resolve('src/assets/images'),
            styles: resolve('src/assets/styles'),
            components: resolve('src/components'),
            pages: resolve('src/pages')
        }
    },
    module: {
        rules: [
            //模板文件
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            },
            //css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //图片
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    //publicPath: '/',
                    name: 'images/[name].[ext]',
                    esModule: false,
                    limit: 10000
                }
            },
            //字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index/index.art',
            filename: 'index.html'
        })
    ]
}