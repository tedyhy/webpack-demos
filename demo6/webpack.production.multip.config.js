var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var BUILD_MULTIP_PATH = path.resolve(ROOT_PATH, 'build-multip');
// template的文件夹路径
var TEM_PATH = path.resolve(ROOT_PATH, 'app/templates');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		mobile: path.resolve(APP_PATH, 'mobile.js'),
		vendors: ['jquery', 'moment'] // 添加要打包在vendors里面的库
	},
	output: {
		path: BUILD_MULTIP_PATH,
		// 注意，我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，
		// 这里就是(app.js,mobile.js和vendors.js)
		filename: '[name].[hash].js',
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
	},
	plugins: [
		// 创建了两个HtmlWebpackPlugin的实例，生成两个页面：index.html、mobile.html
		new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
			title: 'Hello World index.html',
			filename: 'index.html', //生成的html存放路径，相对于 path
			template: path.resolve(TEM_PATH, 'activityList.html'), //html模板路径
			inject: 'body', //允许插件修改哪些内容，包括head与body，要把script插入到标签里
			// chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks: ['vendors', 'app'],
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}),
		new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
			title: 'Hello World mobile.html',
			filename: 'mobile.html', //生成的html存放路径，相对于 path
			template: path.resolve(TEM_PATH, 'mobile.html'), //html模板路径
			inject: 'body', //允许插件修改哪些内容，包括head与body
			chunks: ['vendors', 'mobile'],
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ //压缩代码
			compress: {
				warnings: false
			},
			except: ['$super', '$', 'jQuery', 'exports', 'require'] //排除关键字
		}),
		// 把入口文件里面的数组打包成verdors.js
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		// 加载jquery，为每个脚本提供变量：$、jQuery、window.jQuery。
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
	],
};