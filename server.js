const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3001;
const app = express();
const server = require("http").Server(app);

const io = socketio(server, {
  cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

app.use("/api", Router);

app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}.`)
);

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
