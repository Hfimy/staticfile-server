const http = require('http');

const chalk = require('chalk');
const config = require('./config/defaultConfig');
const openUrl = require('./helper/openUrl');

const route = require('./helper/route');

class Server {
    constructor(conf) {
        this.conf = Object.assign({}, config, conf);
    }

    start() {
        const { hostname, port, root } = this.conf;
        //req,res都是流对象
        const server = http.createServer((req, res) => {
            route(req, res, root);
        });

        server.listen(port, hostname, () => {
            const addr = `http://${hostname}:${port}`;
            //eslint-disable-next-line no-console
            console.info(`Server is running at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }
}

module.exports = Server;




