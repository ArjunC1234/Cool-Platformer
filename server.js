const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

function Handler () {
  this.users = []
  this.addUser = (socket, displayname) => {
    let address = socket.handshake.address
    this.users.push({
      ip : address.address,
      port : address.port,
      displayName : displayname,
      data : {}
    })
  }
  this.getUser = (client=false) => {
    
  }
}

  
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
  socket.on('disconnect', () => {
    socket.emit("dc")
  });
  socket.on('getOthers', (id) => {
    io.sockets.emit('getOthers', id)
  });
  socket.on('sendOthers', (idTo, idFrom, left, top, color) => {
    io.sockets.emit('sendOthers', idTo, idFrom, left, top, color)
  });
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});

