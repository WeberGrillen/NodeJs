import express from 'express';
const app = express();

app.use(express.static('public'));

import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A new socket connecting with id", socket.id);

    socket.on("client-sends-color", (data) => {
        
        // Emits to ALL sockets including itself
        io.emit("server-sends-color", data);

        //socket.broadcast.emit("server-sends-color", data);

        // Emits to the socket itself but not the others
        // socket.emit("server-sends-color", data);
    });

    socket.on("disconnect", () => {
        console.log("A socket disconnected", socket.id);
    })
});

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => console.log("Server is running on port", PORT));