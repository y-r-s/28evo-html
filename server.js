import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from "node:url";
import {dirname, join} from 'node:path';

const app = express();
const server = createServer(app);
const io= new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/',(req, res) =>{
    res.sendFile(join(__dirname, 'client.html'));
});

io.on('connection',(socket) =>{
    console.log('a user connected');
    socket.on('chat message',(msg) =>{
        io.emit('chat message', msg);
    });
});

server.listen(3000, ()=>{
    console.log('server running at http://localhost:3000');
});