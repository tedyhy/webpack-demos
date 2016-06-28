参考:
https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-2.md
https://segmentfault.com/a/1190000002552008

一、build优化
1.分离app.js和第三方库
现在我们build出来的只有一个bundle.js如果第三方库很多的话，会造成这个文件非常大，减慢加载速度，
现在我们要把第三方库和我们app本身的代码分成两个文件。

修改entry入口文件如下：
entry: {
	app: path.resolve(APP_PATH, 'index.js'),
	// 添加要打包在vendors里面的库
	vendors: ['jquery', 'moment']
},

添加CommonsChunkPlugin：
plugins: [
    // 这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    // 把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
    	title: 'Hello World app'
    })
]

添加完毕后运行如下：
$npm run build


2.生成多页面
运行如下：
$npm run build-multip

3.生成Hash名称的script来防止缓存
基于文件的md5，配置如下：
output: {
	path: BUILD_PATH,
	// 只要再加上hash这个参数就可以了
	filename: '[name].[hash].js'
},
