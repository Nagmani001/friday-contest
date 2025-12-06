import { WebSocket, WebSocketServer } from "ws";


const wss = new WebSocketServer({
  port: 8080
});


wss.on("connection", (ws: WebSocket, request) => {
  const token = request.headers.authorization;


  ws.send("hi");

  ws.on("message", () => {

  });
})
