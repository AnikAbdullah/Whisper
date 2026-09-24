import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

export function getReceiverSocketIds(userId) {
  return [...(userSocketMap[userId] ?? [])];
}

// userId -> Set of socket ids (one per open tab)
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);
  const userId = socket.userId;
  if (!userSocketMap[userId]) userSocketMap[userId] = new Set();
  userSocketMap[userId].add(socket.id);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    const userSockets = userSocketMap[userId];
    userSockets.delete(socket.id);
    if (userSockets.size === 0) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
