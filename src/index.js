const http=require('http');
const path=require('path');
const chalk=require('chalk');
const {root,port,hostname}=require('./config/defaultConfig');

//req,res都是流对象
const server=http.createServer((req,res)=>{
    const filePath=path.join(root,req.url)

    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end(filePath);
});

server.listen(port,hostname,()=>{
    const addr=`http://${hostname}:${port}`;
    //eslint-disable-next-line no-console
    console.info(`Server is running at ${chalk.green(addr)}`);
});



