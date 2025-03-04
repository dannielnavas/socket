//const socket = io(); // conectarse al servidor pero en caso de namespaces se quita esta porque es global

// function checkSocketStatus() {
//   console.log("El estado de mi socket es ", socket.connected);
// }

// socket.on("connect", () => {
//   console.log("conectado", socket.id);
//   checkSocketStatus();
// });

// socket.on("disconnect", () => {
//   console.log("desconectado", socket.id);
//   checkSocketStatus();
// });

// socket.io.on("reconnect_attempt", () => {
//   console.log("reconectado", socket.id);
// });

// socket.io.on("reconnect", () => {
//   console.log("reconectado exitosamente", socket.id);
// });

// socket.on("Welcome", (message) => {
//   const text = document.querySelector("#text");
//   text.textContent = message;
// });

// const emitToServer = document.querySelector("#emit-to-server");

// emitToServer.addEventListener("click", () => {
//   socket.emit("server", "Hola desde el cliente 😎");
// });

// socket.on("everyone", (message) => {
//   console.log(message);
// });

// const emitToLast = document.querySelector("#emit-to-last");

// emitToLast.addEventListener("click", () => {
//   socket.emit("last", "Hola ultimo 😎");
// });

// socket.on("salute", (message) => {
//   console.log(message);
// });

// // on once off
// socket.on("on", (message) => {
//   console.log(message);
// });

// socket.once("once", (mensaje) => {
//   console.log(mensaje);
// });

// const listener = () => {
//   console.log("se apaga el evento");
// };

// socket.on("off", listener); // se apaga el evento despues de 5 segundos debe tener un nombre el evento para poder apagarlo

// setTimeout(() => {
//   socket.off("off", listener);
// }, 5000);

// mover circulo con el mouse y socket.io que pemite mover el circulo en tiempo real entre diferentes clientes

// const circle = document.querySelector("#circle");

// const drawCircle = (position) => {
//   circle.style.top = position.top;
//   circle.style.left = position.left;
// };

// const drag = (e) => {
//   const position = {
//     top: e.clientY + "px",
//     left: e.clientX + "px",
//   };

//   drawCircle(position);
//   socket.emit("circle position", position);
// };

// document.addEventListener("mousedown", (e) => {
//   document.addEventListener("mousemove", drag);
// });

// document.addEventListener("mouseup", (e) => {
//   document.removeEventListener("mousemove", drag);
// });

// socket.on("move circle", (position) => {
//   drawCircle(position);
// });

// salas

// const connectRoom1 = document.querySelector("#connectRoom1");
// const connectRoom2 = document.querySelector("#connectRoom2");
// const connectRoom3 = document.querySelector("#connectRoom3");

// // eventos para que al hacer click en el boton se conecte a la sala

// connectRoom1.addEventListener("click", () => {
//   socket.emit("connect to room", "room1");
// });

// connectRoom2.addEventListener("click", () => {
//   socket.emit("connect to room", "room2");
// });

// connectRoom3.addEventListener("click", () => {
//   socket.emit("connect to room", "room3");
// });

// // enviar mensaje a la sala

// const sendMessage = document.querySelector("#sendMessage");

// sendMessage.addEventListener("click", () => {
//   const message = prompt("Escribe tu mensaje");
//   socket.emit("message", message);
// });

// socket.on("message", (data) => {
//   const { message, room } = data;
//   const li = document.createElement("li");
//   li.textContent = `Sala ${room}: ${message}`;
//   document.querySelector(`#${room}`).appendChild(li);
// });

// namespace

// const user = prompt("Ingresa tu nombre de usuarios");

// const profes = ["Samuel", "Leslye"];

// let socketNameSpace, group;

// const chat = document.querySelector("#chat");
// const namespace = document.querySelector("#namespace");

// if (profes.includes(user)) {
//   socketNameSpace = io("/profesores");
//   group = "profesores";
// } else {
//   socketNameSpace = io("/estudiantes");
//   group = "estudiantes";
// }

// socketNameSpace.on("connect", () => {
//   namespace.textContent = group;
// });

// // logica de envio de mensajes

// const sendMessage = document.querySelector("#sendMessage");

// sendMessage.addEventListener("click", () => {
//   const message = prompt("Escribe tu mensaje");
//   socketNameSpace.emit("sendMessage", {
//     user,
//     message,
//   });
// });

// socketNameSpace.on("message", (data) => {
//   const { user, message } = data;
//   const li = document.createElement("li");
//   li.textContent = `${user}: ${message}`;
//   chat.appendChild(li);
// });

// disconnect and reconnect

// const send = document.querySelector("#send");
// const disconnect = document.querySelector("#disconnect");
// const reconnect = document.querySelector("#reconnect");

// send.addEventListener("click", () => {
//   if (socket.connected) {
//     socket.emit("is connect", "Esta conectado 😎");
//   }
// });

// disconnect.addEventListener("click", () => {
//   socket.disconnect();
// });

// reconnect.addEventListener("click", () => {
//   socket.connect();
// });

// volatile

// const circle = document.querySelector("#circle");

// const drawCircle = (position) => {
//   circle.style.top = position.top;
//   circle.style.left = position.left;
// };

// const drag = (e) => {
//   const position = {
//     top: e.clientY + "px",
//     left: e.clientX + "px",
//   };

//   drawCircle(position);
//   console.log("Se envía el evento al servidor");
//   socket.volatile.emit("circle position", position); // se envia la ultima posición mas no todos los eventos que se generen
// };

// document.addEventListener("mousedown", (e) => {
//   document.addEventListener("mousemove", drag);
// });

// document.addEventListener("mouseup", (e) => {
//   document.removeEventListener("mousemove", drag);
// });

// socket.on("move circle", (position) => {
//   drawCircle(position);
// });
const socket = io({
  auth: {
    token: "1234s56",
  },
});

// En caso de error en el middleware de autenticación

socket.on("connect_error", (error) => {
  console.log(error.message);
  console.log(error.data.message);
});
