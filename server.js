import express from "express";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to your client app's URL
    methods: ["GET", "POST"],
    credentials: true,
  }
});


env.config();

const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend via Axios!" });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname +"/front-end/build/index.html");
});

io.on("connection", (socket) => {
  console.log('a user connected from front end');
});

server.listen(port, () => {
  console.log(`Server and Socket.io are listening on port ${port}...`);
});