const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

function Handler () {
  this.users = []
  this.addUser = (id) => {
    this.users.push({
      id : id,
      displayName : "",
      data : {}
    })
  }
  this.delUser = (id) => {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        this.users.splice(i, 1)
      }
    }
  }
  this.getUser = (getBy, value) => {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i][getBy] == value) {
        return this.users[i]
      }
    }
  }
}

var game = new Handler()
  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  game.addUser(socket.id)
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

setInterval(function () {
  io.emit("updateGame", game.users)
}, 50)


http.listen(port, () => {
  console.log(`running at ${port}`);
});

