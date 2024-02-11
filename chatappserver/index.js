import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import prisma from './prismaClient.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const onlineUsers = {};

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log('disconnected');
        delete onlineUsers[socket.id];
    });
    socket.on('newUser', (data) => {
        onlineUsers;
    });

    socket.on('joinRoom', async (roomId) => {
        socket.join(roomId);
        const messages = await prisma.message.findMany({
            where: { roomId: roomId },
            orderBy: { createdAt: 'asc' },
        });
        socket.emit('loadMessages', messages);
    });

    // Manejar los mensajes en una sala
    socket.on('message', async (data) => {
        socket.emit('messageResponse', data);
    });
});

server.listen(3001, () => {
    console.log('server on');
});
