const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const port = 3001;

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('deviceData', (message) => {
        console.log(message);
        io.emit("frontend", message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});