/* eslint-disable prettier/prettier */
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// client-side
socket.on('connect', () => {
    socket.emit('create', {user_uuid: 'test_1_uuid@example.com'}, (val) => {
        console.log(val);
    })

    socket.emit("getAllChats", {user_uuid: 'test_1_uuid@example.com'}, (val) => {
        console.table(val);
    })

    socket.emit("getChatMessages", {user_uuid: 'test_1_uuid@example.com', receiver_uuid: 'test_uuid@example.com'}, (val) => {
        console.table(val);
    })

    socket.on('receiveMessage', (message) => {
        console.log(message)
    })
});

socket.emit("createMessage", {
    sender_uuid: 'test_1_uuid@example.com',
    receiver_uuid: 'test_uuid@example.com',
    content: 'hello world',
})

socket.on('disconnect', () => {
    console.log(socket.id); // undefined
});