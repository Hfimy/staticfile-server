const http = require('http');

const chalk = require('chalk');
const { port, hostname } = require('./config/defaultConfig');

const route = require('./helper/route');

//req,res都是流对象
const server = http.createServer((req, res) => {

    route(req, res);
    
});

server.listen(port, hostname, () => {
    const addr = `http://${hostname}:${port}`;
    //eslint-disable-next-line no-console
    console.info(`Server is running at ${chalk.green(addr)}`);
});



