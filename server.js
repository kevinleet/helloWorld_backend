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

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //console.log(`Socket ${socket.id} connected`);

  socket.on('setup', (userData) => {
    try {
      socket.join(userData._id)
    console.log(userData._id)
    socket.emit('connected')
    } catch (error) {
      console.log(error)
    }
    
  })
  
  socket.on('join chat', (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`)
  })

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat
console.log(chat)
    chat?.users.forEach(user => {
      if (user == newMessageRecieved.sender._id) return;
      socket.in(user).emit("message recieved", newMessageRecieved)
      console.log(`sent from ${newMessageRecieved.sender._id} to ${user}`)
    })
  });

  

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
