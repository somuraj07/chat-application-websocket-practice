import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const users = new Map();

wss.on("connection", (ws) => {
  console.log("New client connected ✅");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());

    if (data.type === "register") {
      users.set(data.username, ws);
      ws.username = data.username;
      console.log(`${data.username} joined`);
    }

    if (data.type === "chat") {
      const { from, to, text } = data;
      console.log(`Received chat: ${from} -> ${to}: ${text}`);

      const receiver = users.get(to);
      if (receiver && receiver.readyState === ws.OPEN) {
        receiver.send(JSON.stringify({ from, text }));
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected ");
    if (ws.username) {
      users.delete(ws.username);
    }
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket + Express server running ");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
