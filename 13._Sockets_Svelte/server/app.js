import 'dotenv/config';

import express from 'express';
const app = express();

app.use(express.json());

import cors from 'cors';
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

import session from 'express-session';

const sessionMiddleware = session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

import nicknamesRouter from './router/nicknamesRouter.js';
app.use(nicknamesRouter);

import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';
import { error } from 'console';
const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true
  }
});

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
    console.log("A new socket connecting with id", socket.id);

    socket.on("client-sends-color", (data) => {

        const session = socket.request.session;

        session.reload((error) => {


            
            session.timesSubmitted = session.timesSubmitted + 1 || 1;
            

            data.nickname = session.nickname;
            data.timesSubmitted = session.timesSubmitted;

            // Emits to ALL sockets including itself
            io.emit("server-sends-color", data);

            session.save();
        });

        
        

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