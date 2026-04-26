const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');


const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleCssFile = fs.readFileSync(pathToStyle);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptJsFile = fs.readFileSync(pathToScript);
const server = http.createServer((req, res) => {
    switch(req.url) {
    case '/': return res.end(indexHtmlFile);
    case '/style.css': return res.end(styleCssFile);
    case '/script.js': return res.end(scriptJsFile);
    }
    res.statusCode = 404;
    return res.end('Error 404');
});
server.listen(3000);
const io = new Server(server);

 io.on('connection', (socket) => {
        console.log('a user connected - ' + socket.id);
        socket.on('new_message', (message) => {
            io.emit('new_message', (message));
        });
    });