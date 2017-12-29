module.exports=(totalSize,req,res)=>{
    const range=req.headers['range'];
    if(!range){
        return {code:200};// 没有range字段，返回所有
    }
    //正则的match匹配，属于String正则表达方法，有全局标志g时，返回的数组保存的是所有匹配的内容，不包含子匹配；没有全局标志g时，返回的数组第一项是完整的匹配，后面依次是子匹配
    //正则的exec匹配，等同于没有全局标志g的match
    const sizes=range.match(/bytes=(\d*)-(\d*)/);
    const start=sizes[1]||0;
    const end=sizes[2]||totalSize;

    if(start>end||start<0||end>totalSize){
        return {code:416};//所请求的范围无法满足
    }

    res.setHeader('Accept-Ranges','bytes'); //用来告知客户端服务器是否能处理范围请求
    res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length',end-start); //减操作符自动把参数转换为数字，结果也为数字，
    // 所以从此处可以看出强类型对于代码编写的好处，弱类型需要你确保知道每个地方的变量类型

    return {
        code:206, //partial content
        start:parseInt(start),
        end:parseInt(end)
    };
};
