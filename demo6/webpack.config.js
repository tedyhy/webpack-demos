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
		APP_PATH
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
			loaders: ['style', 'css?sourceMap'],
			include: APP_PATH
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css?sourceMap', 'sass?sourceMap'], // 为css启用source-map
			include: APP_PATH
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=40000' // limit参数：当你图片大小小于这个限制的时候，会自动启用base64编码图片。
		}, {
			test: /\.jsx?$/, // js或jsx结尾的文件
			loader: 'babel',
			include: APP_PATH,
			query: {
				// es2015这个参数是babel的plugin，可以支持各种最新的es6的特性。
				// 现在我们可以改掉CommonJS风格的文件了。
				presets: ['es2015']
			}
		}],
		preLoaders: [{
			test: /\.jsx?$/,
			include: APP_PATH,
			loader: 'jshint-loader'
		}]
	},
	plugins: [
		new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
			title: 'Hello World activityList',
			filename: 'activityList.html', //生成的html存放路径，相对于 path
			template: APP_PATH + '/templates/activityList.html', //html模板路径
			inject: 'body', //允许插件修改哪些内容，包括head与body
			// hash: true, //为静态资源生成hash值
			// minify: { //压缩HTML文件
			// 	removeComments: true, //移除HTML中的注释
			// 	collapseWhitespace: true //删除空白符与换行符
			// }
		}),
		// new webpack.optimize.UglifyJsPlugin({ //压缩代码
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	except: ['$super', '$', 'jQuery', 'exports', 'require'] //排除关键字
		// }),
		// 加载jquery，为每个脚本提供变量：$、jQuery、window.jQuery。
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
	],
	// webpack-dev-server 配置
	devServer: {
		contentBase: BUILD_PATH,
		// historyApiFallback: true,
		// hot: true,
		inline: true,
		progress: true,
		// 其实很简单的，只要配置这个参数就可以了
		proxy: {
			'/apis/*': {
				target: 'http://localhost:3000/',
				secure: false
			}
		}
	},
	// 启用source-map，方便开发定位和排错
	devtool: 'eval-source-map',
	//配置jshint的选项，支持es6的校验
	jshint: {
		"esnext": true
	},
};