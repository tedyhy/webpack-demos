参考:
https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-2.md

一、开发和部署技巧
1.开发技巧
1）启用source-map
可以为js、css启用sourceMap，在开发的时候，方便开发人员定位排错。如果不使用，一旦报错，开发人员只能从打包过后的bundle中
查找错误，非常不友好。
开启：
只需要在config中添加如下：
...
devtool: 'eval-source-map',
...

为css添加source-map
...
{
	test: /\.scss$/,
	loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
	include: APP_PATH
},
...


2）配置webpack-dev-server代理
参考：
https://webpack.github.io/docs/webpack-dev-server.html#proxy

...
devServer: {
	...
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/apis/*': {
          target: 'http://localhost:3000',
          secure: false
      }
    }
    ...
},
...
重启以后，发现/apis/*的请求都代理到http://localhost:3000去了～
如：
请求接口http://localhost:8080/apis/products，被代理到http://localhost:3000/apis/products。
这样一来，方便开发的时候模拟假数据。


3）和express配合
参考：
http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/


4）使用preLoaders和postLoaders
也许你想在写代码的时候检查自己的js是否符合jshint的规范。
preLoaders顾名思义就是在loaders执行之前处理的，webpack的处理顺序是preLoaders - loaders - postLoaders。
安装jshint：
$npm install jshint-loader --save-dev
需要在config中配置。


5）添加ES6的支持
$npm install babel-loader babel-preset-es2015 --save-dev
配置如下：
...
  {
    test: /\.jsx?$/,
    loader: 'babel',
    include: APP_PATH,
    query: {
      presets: ['es2015']
    }
  },
...
注意：es5、es6语法可以混编，但是最好不要混编。


6）加载jQuery plugin或者其他legacy第三方库
你的项目有时候会要加载各种各样的第三方库，一些老的库不支持AMD或者CommonJS等一些先进的格式，
比如一些jQuery的插件，它们都依赖jQuery，如果直接引用就会报错 jQuery is not undefined这类的错误，
有几种方法解决。
·第一种方法
	使用webpack.ProvidePlugin。将变量提供给每个脚本。
	如：
	  ...
	  plugins: [
	    //provide $, jQuery and window.jQuery to every script
	    new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
	    })
	  ]
	  ...
·第二种方法
	使用imports-loader
	安装如下：
		$npm install imports-loader --save-dev

	// 注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
	// 相当于在这个文件的开始添加了 var jQuery = require('jquery');
	import 'imports?jQuery=jquery!./plugin.js';

	// 后面的代码一样
	myPromise.then((number) => {
	  $('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>');
	  //call our jquery plugin!
	  $('p').greenify();
	});



二、部署上线
我们应该新创建一个单独的config文件，因为部署上线使用webpack的时候我们不需要一些dev-tools,dev-server和jshint校验等。
复制我们现有的config文件，命名为 webpack.production.config.js，将里面关于 devServer等和开发有关的东西删掉。

在package.json中添加一个命令，如下：
"scripts": {
	"start": "webpack-dev-server --inline",
	"build": "webpack --progress --profile --colors --config webpack.production.config.js"
},

当要上线的时候,运行如下：
$npm run build



