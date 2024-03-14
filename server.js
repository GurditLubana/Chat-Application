import express from "express";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
env.config();

const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend via Axios!" });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname +"/front-end/build/index.html");
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
