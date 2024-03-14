import express from "express";
import env from "dotenv";

const app = express();
env.config();

const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend via Axios!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
