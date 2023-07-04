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

    chat?.users.forEach(user => {
      if (user == newMessageRecieved.sender) return;
      socket.in(chat._id).emit("message recieved", newMessageRecieved)
    })
  });

  

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
