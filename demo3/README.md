1.配置webpack-dev-server
我们要不断运行程序然后查看页面，所以最好新建一个开发服务器，可以serve我们pack以后的代码，并且当代码更新的时候自动刷新浏览器（demo3）。

webpack-dev-server（webpack开发服务器），是webpack官方提供的一个辅助开发工具，它可以自动监控项目下的文件，一旦有修改保存操作，开发服务器就会自动运行webpack 打包命令，帮我们自动将开发的代码重新打包。而且，如果需要的话，还能自动刷新浏览器，重新加载资源。

2.参考
https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-1.md#配置webpack-dev-server
https://webpack.github.io/docs/webpack-dev-server.html#content-base
http://www.07net01.com/2015/12/1004731.html

3.
npm install webpack-dev-server -g
或
npm install webpack-dev-server --save-dev

4.提供本地静态资源服务器服务
npm start

5.访问地址为：http://localhost:8080/webpack-dev-server
这里是dev-server提供静态资源服务的目录，可以通过以下配置指定：
devServer: {
	contentBase: 'build'
}
或者是在命令行添加此配置：
$webpack-dev-server --inline --content-base build

6.访问地址为：http://localhost:8080/webpack-dev-server
这里面都是生成后的build目录下的静态资源





