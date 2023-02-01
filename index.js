const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("enter game", (msg) => {
    console.log("player " + msg + "  entered game");
  });

  socket.on("joyStick input", (msg) => {
    console.log("joystick " + msg);
  });

  socket.on("btnA", (msg) => {
    console.log("btnA pressed" + msg);
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
