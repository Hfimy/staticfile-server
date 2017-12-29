const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { root, port, hostname } = require('./config/defaultConfig');

const mime = require('./helper/mime');
const compress = require('./helper/compress');
const range = require('./helper/range');
const isFresh = require('./helper/cache')

const Handlebars = require('handlebars');

/* 读写文件时建议使用path拼接成绝对路径，因为此时的相对路径是相对于启动node程序的目录，
会随着启动程序的位置不同生成不同的路径 */
const tplPath = path.join(__dirname, './template/index.tpl');
const source = fs.readFileSync(tplPath).toString();//读buffer会相对快一点，读完之后再转字符串
const template = Handlebars.compile(source);

const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

//req,res都是流对象
const server = http.createServer(async (req, res) => {
    const filePath = path.join(root, req.url);
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            console.log('确认使用了本地的缓存吗?')
            if (!isFresh(stats, req, res)) {
                console.log('确认资源没有更新')
                res.statusCode = 304;
                res.end();
                return;
            }
            
            //返回正确的mime类型
            const contentType = mime(filePath);
            res.setHeader('Content-Type', contentType);//Content-Type后面继续设置会覆盖前面的

            const { code, start, end } = range(stats.size, req, res);
            res.statusCode = code;//同上

            let rs;
            //是否有范围请求
            if (code === 200) {
                rs = fs.createReadStream(filePath);
            } else if (code === 206) {
                rs = fs.createReadStream(filePath, { start, end });// 返回部分内容
            } else if (code === 416) {
                res.setHeader('Content-Type', 'text/plain');
                res.end('Failed to satisfy the range request');
                return;
            }

            //压缩文件
            //压缩所有返回的文件
            rs = compress(rs, req, res);
            // 只压缩指定格式的文件
            // if(filePath.match(compressFile)){
            //     rs=compress(rs,req,res)
            // }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(root, filePath);
            const data = {
                //path.basename返回path的最后一部分
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            };
            res.end(template(data));
        }
    } catch (e) {
        //eslint-disable-next-line no-console
        console.error(chalk.red(e.message));
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is not a directory or file');
    }
});

server.listen(port, hostname, () => {
    const addr = `http://${hostname}:${port}`;
    //eslint-disable-next-line no-console
    console.info(`Server is running at ${chalk.green(addr)}`);
});



