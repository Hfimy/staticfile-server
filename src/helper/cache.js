const { cache } = require('../config/defaultConfig');

function refreshRes(stats, res) {
    const { maxAge, expires, cacheControl, lastModified, etag } = cache;
    
    if (cacheControl) {
        // public表明所有用户都可以利用缓存
        res.setHeader('Cache-Control', `public,max-age=${maxAge}`);//相对时间，且优先级高于expires
    }
    if (expires) {
        res.setHeader('Expires', 'Mon,1 January 2018 00:00:00 GMT');//绝对时间，因为时区的问题现在已经不怎么使用了
    }

    //lashModified和etag选择一种就行了
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }
    //eslint-disable-next-line
    const ETag=`${stats.size}-${stats.mtime.toUTCString().replace(/\,/,'')}`;
    if (etag) {
        res.setHeader('ETag',`${ETag}`);
    } 
}

module.exports=function isFresh(stats, req, res) {
    refreshRes(stats,res);

    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];

    if (!lastModified && !etag) {
        return true;
    }

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return true;
    }
    
    if (etag && etag !== res.getHeader('ETag')) {
        return true;
    }

    return false;
};

