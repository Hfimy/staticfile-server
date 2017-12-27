const http=require('http');
const path=require('path');
const fs=require('fs');
const chalk=require('chalk');
const {root,port,hostname}=require('./config/defaultConfig');

//req,res都是流对象
const server=http.createServer((req,res)=>{
    const filePath=path.join(root,req.url);
    fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode=404;
            res.setHeader('Content-Type','text/plain');
            res.end('This is not a directory or file');
            return;
        }
        if(stats.isFile()){
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            fs.readdir(filePath,(err,files)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','text/plain');
                res.end(files.join('\n'));
            });
        }
    });
});

server.listen(port,hostname,()=>{
    const addr=`http://${hostname}:${port}`;
    //eslint-disable-next-line no-console
    console.info(`Server is running at ${chalk.green(addr)}`);
});



