const net = require("net");
const socket = net.createConnection(587, "smtp.gmail.com");
socket.on("connect", () => {
  console.log("Połączono z smtp.gmail.com:587 – port OTWARTY");
  socket.end();
});
socket.on("error", (err) => {
  console.error("Nie udało się połączyć:", err);
});
