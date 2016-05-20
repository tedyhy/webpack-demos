var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require("webpack-dev-server");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: [
		'./app/'
	],
	output: {
		path: BUILD_PATH,
		filename: 'bundle-[hash].js',
	},
	module: {
		// test里面包含一个正则，包含需要匹配的文件，loaders是一个数组，包含要处理这些程序的loaders
		// 这里我们用了css和style，注意loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loader.
		loaders: [{
			test: /\.css$/,
			loaders: ['style', 'css'],
			include: APP_PATH
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass'], // 或者：'style!css!sass'
			include: APP_PATH
		}, ]
	},
	plugins: [
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
	// webpack-dev-server 配置
	devServer: {
		contentBase: BUILD_PATH,
		// historyApiFallback: true,
		// hot: true,
		inline: true,
		progress: true,
	}
};