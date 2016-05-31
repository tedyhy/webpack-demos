1.添加css样式
webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader：css-loader 和 style－loader。
css-loader会遍历css文件，找到所有的url(...)并且处理。
style-loader会把所有的样式插入到你页面的一个style标签中。

2.安装相关loader
1) css loader
$npm install css-loader style-loader --save-dev

webpack的理念是基于项目处理的，把对应的文件格式给对应的loader处理，然后你就不用管了，它会决定怎么压缩，编译。

2) 使用sass、less预编译程序
$npm install sass-loader node-sass --save-dev


3) 处理图片
根据你的需求将一些图片自动转成base64编码的，为你减轻很多的网络请求。
$npm install url-loader --save-dev


3.启动服务
$npm start

4.taobao npm库地址
http://npm.taobao.org/package/

5.通过npm添加第三方库
$npm install jquery moment --save

6.webpack可以处理动态语言模板，如php、jsp等
如：

plugins: [
	new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
		title: 'Hello World activityList',
		filename: 'activityList.php', //生成的html存放路径，相对于 path
		template: APP_PATH + '/templates/activityList.php', //html模板路径
		inject: 'body', //允许插件修改哪些内容，包括head与body
		// hash: true, //为静态资源生成hash值
		minify: { //压缩HTML文件
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: true //删除空白符与换行符
		}
	}),
]

