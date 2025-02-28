const express = require("express");
const { createServer } = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const socketsOnline = [];

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "views/index.html");
});

io.on("connection", (socket) => {
  socketsOnline.push(socket.id);
  // console.log("clientes conectados", io.engine.clientsCount);
  // console.log("id del cliente conectado", socket.id);

  // socket.on("disconnect", () => {
  //   console.log("cliente ", socket.id, " desconectado");
  //   console.log("cliente desconectado", io.engine.clientsCount);
  // });

  // socket.conn.once("upgrade", () => {
  //   console.log(
  //     "Hemos pasado de un protocolo HTTP a un protocolo WebSocket",
  //     socket.conn.transport.name
  //   );
  // });
  // emision basica
  socket.emit("Welcome", "Ahora estas conectado 😍");

  socket.on("server", (message) => {
    console.log(message);
  });

  // emision a todos los clientes
  io.emit("everyone", socket.id + " Hola a todos los clientes 🎹");

  // emision a uno solo

  socket.on("last", (message) => {
    const lastSocket = socketsOnline[socketsOnline.length - 1];
    io.to(lastSocket).emit("salute", message);
  });

  // on once off
  socket.emit("on", "Este mensaje se emitira varias veces 😎 por el uso del on");

  socket.emit("once", "Este mensaje se emitira una sola vez 😎 por el uso del once");

  // socket.emit("off", "holi");

  // setTimeout(() => {
  //   socket.off("off", "holi");
  // }, 5000);
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
