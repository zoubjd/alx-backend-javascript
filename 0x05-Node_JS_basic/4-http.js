const http = require('http');

server = http.createServer();

server.on('request', (req, res) => {
    res.end('Hello Holberton School!');
})

server.listen(1245);

module.exports = server;
