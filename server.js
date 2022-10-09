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
    return this.getUser("id", id)
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
  socket.on('updateUser', (data) => {
    io.emit()
  })
  socket.on('disconnect', function(){
    
  });
});

setInterval(function () {
  io.sockets.emit("updateGame", game.users)
}, 50)


http.listen(port, () => {
  console.log(`running at ${port}`);
});

