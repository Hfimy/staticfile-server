const path=require('path');
const mimeTypes={
    'css':'test/css;charset=utf8',
    'gif':'image/gif;charset=utf8',
    'html':'text/html;charset=utf8',
    'ico':'image/x-icon;charset=utf8',
    'jpeg':'image/jpeg;charset=utf8',
    'js':'text/javascript;charset=utf8',
    'json':'application/json;charset=utf8',
    'pdf':'application/pdf;charset=utf8',
    'png':'image/png;charset=utf8',
    'svg':'image/svg+xml;charset=utf8',
    'swf':'application/x-shockwave-flash;charset=utf8',
    'tiff':'image/tiff;charset=utf8',
    'txt':'text/plain;charset=utf8',
    'wav':'audio/x-wav;charset=utf8',
    'wma':'audio/x-ms-wma;charset=utf8',
    'wmv':'video/x-ms-wmv;charset=utf8',
    'xml':'text/xml;charset=utf8'
};

module.exports=(filePath)=>{
    const ext=path.extname(filePath).split('.').pop().toLowerCase();
    // if(!ext){
    //     ext=filePath;
    // }
    return mimeTypes[ext]||mimeTypes['txt'];
};
