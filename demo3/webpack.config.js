var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require("webpack-dev-server");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: [
		// 'webpack-dev-server/client?http://localhost:8080',
		'./app/'
	],
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle-[hash].js',
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': 'development'
		// }),
		// new webpack.HotModuleReplacementPlugin(),
		new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
			title: 'Hello World activityList',
			filename: 'activityList.html', //生成的html存放路径，相对于 path
			template: APP_PATH + '/templates/activityList.html', //html模板路径
			inject: 'body', //允许插件修改哪些内容，包括head与body
			// hash: true, //为静态资源生成hash值
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ //压缩代码
			compress: {
				warnings: false
			},
			except: ['$super', '$', 'exports', 'require'] //排除关键字
		}),
		new webpack.ProvidePlugin({ //加载jquery
			$: 'jquery'
		}),
	],
	devServer: {
		contentBase: BUILD_PATH
	}
};