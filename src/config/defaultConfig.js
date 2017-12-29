module.exports={
    root:process.cwd(),//node启动程序所在目录
    hostname:'127.0.0.1',
    port:520,
    compressFile:/\.(html|css|js|md)/,
    cache:{
        maxAge:600,
        expires:true,
        cacheControl:true,
        lastModified:true,
        etag:true
    }
};

