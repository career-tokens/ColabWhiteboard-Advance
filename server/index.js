const express = require('express');
const mongoose = require("mongoose");
const http = require('http');
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("successfully connected to the database"))
    .catch((err) => {
      console.log(err);
      // retry to connect after 5 seconds if connection fails
      setTimeout(connectWithRetry, 5000);
    });
};
// Connect to the MongoDB database
connectWithRetry();

app.use("/rooms", roomRouter);
app.use("/api", userRouter);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    // Join the socket to the specified room
    socket.join(roomId);
  });

  socket.on('leave-room', (roomId) => {
    // Leave the socket from the specified room
    socket.leave(roomId);
  });

  socket.on('client-ready', (roomId) => {
    // Broadcast to clients in the same room
    io.to(roomId).emit('get-canvas-state');
  });

  socket.on('canvas-state', ({ roomId, state }) => {
    console.log('received canvas state');
    // Broadcast to clients in the same room
    io.to(roomId).emit('canvas-state-from-server', { room: roomId, state });
  });

  socket.on('draw-line', ({ room, prevPoint, currentPoint, color }) => {
    // Broadcast to clients in the same room
    io.to(room).emit('draw-line', { room, prevPoint, currentPoint, color });
  });

  socket.on('clear', ({ room }) => {
    // Broadcast to clients in the same room
    io.to(room).emit('clear',{room});
  });
});

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001');
});
