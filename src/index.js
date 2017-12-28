const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { root, port, hostname } = require('./config/defaultConfig');

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
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir=path.relative(root,filePath);
            const data = {
                //path.basename返回path的最后一部分
                title: path.basename(filePath),
                dir: dir?`/${dir}`:'',
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



