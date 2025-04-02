import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 存储连接的用户
const users = new Set();

io.on("connection", (socket) => {
  users.add(socket.id);
  
  // 广播用户列表更新
  io.emit('users', Array.from(users).map(id => ({ id })));

  // 处理音乐节拍
  socket.on('musicBeat', (time) => {
    // 广播给所有客户端，除了发送者
    socket.broadcast.emit('musicBeat', time);
  });

  socket.on("disconnect", () => {
    console.log("客户端已断开连接");
    users.delete(socket.id);
    io.emit('users', Array.from(users).map(id => ({ id })));
  });
});

// 提供静态文件服务
app.use(express.static('public'));

httpServer.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
}); 