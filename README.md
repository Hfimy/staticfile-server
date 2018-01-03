# static-resource-server
<br>
A tiny http server that provides 
local static resource access
<br>

* return the correct mime type by the file extension
* Gzip compressed before returning
* support Content-Range header
* provide caching

## Getting started

### As a cli tool

#### install
```javascript
npm i static-resource-server -g
```
#### use
```javascript
static-resource-server --port 8080 --hostname 127.0.0.2 --root /usr
```
#### options

    --help                     output usage information
    -V, --version              output the version number
    -P, --port <n>             the port to listen to for incoming HTTP 
    -H, --hostname <n>         the host name 
    -R, --root <n>             the root directory of static resources


### As a node module

#### install
```javascript
npm i static-resource-server
```
#### use
```javascript
const Server = require('static-resource-server');
const server = new Server({
  root: '/',                 // optional
  port: 521,                 // optional
  hostname: '127.0.0.2',     // optional
});
 
server.start()
```
