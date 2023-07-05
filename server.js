const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");

const { PORT, ORIGIN } = require("./config");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", Router);

const server = app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}.`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    try {
      if (userData) {
        socket.join(userData._id);
        console.log(
          `${userData.displayname} has connected. User ID: ${userData._id} `
        );
        socket.emit("connected");
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join chat", (room, currentUser) => {
    socket.join(room);
    if (room) {
      console.log(`${currentUser.displayname} joined room. Chat ID: ${room}`);
    }
  });

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    console.log(chat);
    chat?.users.forEach((user) => {
      if (user == newMessageRecieved.sender._id) return;
      socket.in(user).emit("message recieved", newMessageRecieved);
      console.log(`sent from ${newMessageRecieved.sender._id} to ${user}`);
    });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
