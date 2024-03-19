import express from "express";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import pg from 'pg';
// import dbContext from "./front-end/src/Context/dbContext";

env.config();

const db = new pg.Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

});
db.connect((err)=>{
  if(err) throw err;
  console.log("Connected to PostgreSQL Database!")
})

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
});



const port = process.env.PORT;


app.get("*", (req, res) => {
    res.sendFile(__dirname +"/front-end/build/index.html");
});

io.on("connection", async (socket) => {
  console.log(`a user connected from front end ${socket.id}`);
  const messageList = await db.query("SELECT * FROM CHATMESSAGES");
  socket.emit("messageList",messageList.rows);

  socket.on('newMessage', (message)=>{
    db.query(`INSERT INTO ChatMessages (message, sender) VALUES ($1, $2);`,[message, socket.id]);
    const messageDetails = {message:message, sender:socket.id}
    io.emit('updateScreen', messageDetails);
    console.log(`new message recieved from ${socket.id}`)
    
  });
    
  socket.on('disconnect', reason => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => {
  console.log(`Server and Socket.io are listening on port ${port}...`);
});