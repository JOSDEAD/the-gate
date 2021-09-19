const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('call',(message) => {
        console.log(message);
        io.emit(message);
    });
});

setInterval(() => {
    io.emit('call');
}, 8000);
server.listen(8080, () => {
console.log('listening on *:8080');
});