# staticfile-server
动手实现一个Node.js静态资源服务器

* 返回正确的mime类型
* Gzip压缩后再返回
* 添加范围请求处理

#### 安装
```
npm i staticfile-server -g
```

#### 使用方法
```
//作为cli工具

staticfile-server   //把当前文件夹作为静态资源服务器目录

staticfile-server -p 8080  //设置端口号为8080

staticfile-server -h localhost  //设置host为localhost

staticfile-server -d /user  //设置根目录为/user
```
