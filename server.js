import requirejs from "requirejs";
import express from "express";
const app = express();
import cors from "cors";



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const io = requirejs("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, game, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, game, sender: id, text
      })
    })
  })
})


