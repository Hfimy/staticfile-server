const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { root, port, hostname } = require('./config/defaultConfig');
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
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join('\n'));
        }
    } catch (e) {
        if (e) {
            //eslint-disable-next-line no-console
            console.error(chalk.red(e.message));
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('This is not a directory or file');
        }
    }
});

server.listen(port, hostname, () => {
    const addr = `http://${hostname}:${port}`;
    //eslint-disable-next-line no-console
    console.info(`Server is running at ${chalk.green(addr)}`);
});



