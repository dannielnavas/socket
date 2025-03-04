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

// io.on("connection", (socket) => {
//   socketsOnline.push(socket.id);
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
// socket.emit("Welcome", "Ahora estas conectado 😍");

// socket.on("server", (message) => {
//   console.log(message);
// });

// // emision a todos los clientes
// io.emit("everyone", socket.id + " Hola a todos los clientes 🎹");

// // emision a uno solo

// socket.on("last", (message) => {
//   const lastSocket = socketsOnline[socketsOnline.length - 1];
//   io.to(lastSocket).emit("salute", message);
// });

// // on once off
// socket.emit("on", "Este mensaje se emitira varias veces 😎 por el uso del on");

// socket.emit("once", "Este mensaje se emitira una sola vez 😎 por el uso del once");

// socket.emit("off", "holi");

// setTimeout(() => {
//   socket.off("off", "holi");
// }, 5000);

// ejemplo circulo
// mover circulo con el mouse y socket.io que pemite mover el circulo en tiempo real entre diferentes clientes
// socket.on("circle position", (position) => {
//   //io.emit("move circle", position); // emitir a todos los clientes conectados incluso a mi  mismo
//   socket.broadcast.emit("move circle", position); // emitir a todos los clientes conectados excepto a mi
// });

// conectar por salas

// socket.connectedRoom = "";

// socket.on("connect to room", (room) => {
//   socket.leave(socket.connectedRoom); // lo saca de la sala actual

//   switch (room) {
//     case "room1":
//       socket.join("room1");
//       socket.connectedRoom = "room1";
//       break;
//     case "room2":
//       socket.join("room2");
//       socket.connectedRoom = "room2";
//       break;
//     case "room3":
//       socket.join("room3");
//       socket.connectedRoom = "room3";
//       break;
//     default:
//       socket.join("default");
//   }
// });

// socket.on("message", (message) => {
//   const room = socket.connectedRoom;
//   io.to(room).emit("message", {
//     message,
//     room,
//   });
// });
// });

// namespace

// const profesores = io.of("/profesores");
// const estudiantes = io.of("/estudiantes");

// profesores.on("connection", (socket) => {
//   console.log("profesor conectado");
//   socket.on("sendMessage", (message) => {
//     profesores.emit("message", message);
//   });
// });

// estudiantes.on("connection", (socket) => {
//   console.log("estudiante conectado");
//   socket.on("sendMessage", (message) => {
//     estudiantes.emit("message", message);
//   });
// });

// reconnect y offline

// io.on("connection", (socket) => {
//   socket.on("is connect", (msg) => {
//     console.log(msg);
//   });
// });

// volatiles

// io.on("connection", (socket) => {
//   socket.on("circle position", (position) => {
//     socket.broadcast.emit("move circle", position);
//   });
// });

// middleware para autorizar a los clientes

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === "123456") {
    next();
  } else {
    const err = new Error("No autorizado");
    err.data = { message: "No tienes autorizacion" };
    next(err);
  }
});

io.on("connection", (socket) => {
  console.log("cliente conectado", socket.id);
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
