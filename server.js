const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");


const PORT = process.env.PORT || 3001;
const app = express();
//const server = require("http").Server(app);



app.use(express.json());
app.use(cors());

app.use("/api", Router);

const server = app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}.`)
);

const io = require('socket.io')(server, {
  cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  
  socket.on('join chat', (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`)
  })

  socket.on("sendMessage", (message, room) => {
    io.emit("message", message);
    console.log(message, socket.id)
  });

  

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
