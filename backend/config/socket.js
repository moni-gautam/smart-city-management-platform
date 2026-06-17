const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);
    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  return io;
};

// Call this anywhere in the app to emit events
const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIO };