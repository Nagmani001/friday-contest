"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8080
});
wss.on("connection", (ws, request) => {
    console.log("client connected");
    console.log("details of the request ", request.headers.authorization);
    ws.send("hi");
    ws.on("message", () => {
    });
});
//# sourceMappingURL=index.js.map