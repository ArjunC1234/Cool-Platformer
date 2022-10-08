const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  socket.on('connect', (id) => {
    io.sockets.emit('connect', id)
  });
  socket.on('disconnect', (id) => {
    io.sockets.emit('disconnect', id)
  });
  
  socket.on('chat message', (name, msg, id) => {
    io.sockets.emit('chat message', name, msg, id)
  });
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});

