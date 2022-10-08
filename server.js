const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  socket.on('move', (id, left, top) => {
    io.sockets.emit('move', id, left, top)
  })
  socket.on('c', (id) => {
    io.sockets.emit('c', id)
  });
  socket.on('disconnect', (id) => {
    io.sockets.emit('dc', id)
  });
  
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});

