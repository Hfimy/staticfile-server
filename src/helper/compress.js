//node内建的压缩模块
const {createGzip,createDeflate}=require('zlib');

module.exports=(rs,req,res)=>{
    const acceptEncoding=req.headers['accept-encoding'];
    // \b匹配字边界，确保只检测整个单词，如此处只匹配gzip，而不会匹配gzip5之类
    if(!acceptEncoding||!acceptEncoding.match(/\b(gzip|defalte)\b/)){
        return rs;
    }else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
    }
};
