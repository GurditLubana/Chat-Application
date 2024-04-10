import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
import { Server } from "socket.io";
import pg from "pg";
import env from "dotenv";
env.config();

let connected_users = [];

const db = new pg.Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to PostgreSQL Database!");
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/front-end/build/index.html");
});

io.on("connection", async (socket) => {
  console.log("new user connected");
  io.emit("ConnectedUsers", connected_users);

  socket.on("newUser", (userData) => {
    if (!connected_users.includes(userData)) {
      // console.log("new user is ",userData);
      connected_users = [...connected_users, userData];
      console.log(`${userData.name} joined the Chat.`);
      console.log("New user joined and this is the list: ", connected_users);
    }
    io.emit("ConnectedUsers", connected_users);
  });
  const messageList = await db.query("SELECT * FROM CHATMESSAGES");
  socket.emit("messageList", messageList.rows);

  socket.on("newMessage", (messageDetails) => {
    db.query(`INSERT INTO ChatMessages (message, sender) VALUES ($1, $2);`, [
      messageDetails.message,
      messageDetails.sender.id,
    ]);
    console.log("this is messageDetails ", messageDetails);
    io.emit("updateScreen", messageDetails);
    console.log(`new message recieved from ${messageDetails.sender.name}`);
  });

  socket.on("googleClicked", () => {
    socket.emit("googleClientID", process.env.GOOGLE_CLIENT_ID);
  });

  socket.on("logout", (user) => {
    console.log(`disconnect ${user.name} due to logout`);
    console.log(
      "check if user included in the array or not: ",
      connected_users.includes(user)
    );
    connected_users = connected_users.filter((users) => users.id !== user.id);
    io.emit("ConnectedUsers", connected_users);
    console.log(
      "User Disconnected and this is the updated list: ",
      connected_users
    );
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => {
  console.log(`Server and Socket.io are listening on port ${port}...`);
});
