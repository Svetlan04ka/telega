const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const db = require('./database');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleCssFile = fs.readFileSync(pathToStyle);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptJsFile = fs.readFileSync(pathToScript);
const pathToAuth = path.join(__dirname, 'static', 'auth.js');
const authJsFile = fs.readFileSync(pathToAuth);
const pathToRegister = path.join(__dirname, 'static', 'register.html');
const registerHtmlFile = fs.readFileSync(pathToRegister);

const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        
    switch (req.url) {
        case '/': return res.end(indexHtmlFile);
        case '/style.css': return res.end(styleCssFile);
        case '/script.js': return res.end(scriptJsFile);
           case '/auth': return res.end(authJsFile);
        case '/register': return res.end(registerHtmlFile);
    }
        }
        if(req.method === 'POST') {
            switch (req.url) {
                    case'/api/register': return registerUser(req, res);
            }
        }
    res.statusCode = 404;
    return res.end('Error 404');
});

server.listen(3001);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected - ' + socket.id);
    
    let userNickname = 'user';
    let messages = db.getMessages();
 
    socket.emit('all_messages', messages);
    
    socket.on('set_nickname', (nickname) => {
        userNickname = nickname;
    });

    socket.on('new_message', (message) => {
        db.addMessage(message,1);
        io.emit('new_message', userNickname + ': ' + message);
    });
});
