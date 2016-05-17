1.clone
git clone https://github.com/tedyhy/webpack-demos.git

2.create a new repository on the command line
echo "# webpack-demos" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/tedyhy/webpack-demos.git
git push -u origin master

3.push an existing repository from the command line
git remote add origin https://github.com/tedyhy/webpack-demos.git
git push -u origin master

4.mac 配置环境变量
在终端下 vim ~/.bash_profile i #进入编辑
       输入语句 export NODE_PATH="/usr/local/lib/node_modules" 
       esc :wq 
       source ~/.bash_profile  ＃让~/.bash_profile马上生效！

