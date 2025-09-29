const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('room', (data) => {
    socket.join(data);
  
  });

  socket.on('message', (data) => {
    socket.to(data.room).emit('messageReturn', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});