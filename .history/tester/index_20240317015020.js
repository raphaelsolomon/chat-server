/* eslint-disable prettier/prettier */
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// client-side
socket.on('connect', () => {
    socket.emit('create', {user_uuid: 'test'}, (val) => {
        console.log(val);
    })
});

socket.on('disconnect', () => {
    console.log(socket.id); // undefined
});

