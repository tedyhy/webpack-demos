1.配置webpack-dev-server
我们要不断运行程序然后查看页面，所以最好新建一个开发服务器，可以serve我们pack以后的代码，并且当代码更新的时候自动刷新浏览器（demo3）。

2.参考
https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-1.md#配置webpack-dev-server
https://webpack.github.io/docs/webpack-dev-server.html#content-base

3.
npm install webpack-dev-server -g
或
npm install webpack-dev-server --save-dev

4.提供本地静态资源服务器服务
npm start

访问地址为：http://localhost:8080/webpack-dev-server
这里面都是生成后的build目录下的静态资源



