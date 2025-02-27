const socket = io();

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

socket.on("Welcome", (message) => {
  const text = document.querySelector("#text");
  text.textContent = message;
});

const emitToServer = document.querySelector("#emit-to-server");

emitToServer.addEventListener("click", () => {
  socket.emit("server", "Hola desde el cliente 😎");
});

socket.on("everyone", (message) => {
  console.log(message);
});
