# project02

> A Vue.js project

vue代码都在view里；配置路由在router里；
utils的request.js是axios的配置文件，axios用于后端异步通信

myhome和pages的F1,F2是“我的”界面；health是健康界面，需要和主页合并
## 如果想查看health
可以把main.js中 //import health from './health'的注释符号去掉，
并且把render: h => h(myhome)中的myhome改为health

## 如何部署
1. 安装nodejs
2. 拉取项目源码(下载zip或git pull)
3. 使用vscode打开
4. 终端->新建终端，输入命令换源并下载依赖（仅需一次）
    ```
    npm config set registry http://registry.npm.taobao.org/ 
    npm install
    ```
5. 运行命令
    ```
    npm run dev
    ```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
