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
        io.emit('call');
    });
    socket.on('online',() => {
        console.log('porton online');
        io.emit('porton online')
    })
      socket.on("disconnect", (reason) => {
        console.log('Puerton desconectado');
  });
});


server.listen(8080, () => {
console.log('listening on *:8080');
});