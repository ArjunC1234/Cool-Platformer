const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;
const sqlite3 = require('sqlite3').verbose();

app.set("trust proxy", true);

var down = false
var allowedips = [process.env.ALLOWED1]

var levelSockets = []
function checkIP (req, res, path) {
  if (down) {
    for (var i = 0; i < allowedips.length; i++) {
      if (req.ip == allowedips[i]) {
        res.sendFile(__dirname + path)
        return
      }
    }
    res.sendFile(__dirname + "/maintainence.html")
  } else {
    res.sendFile(__dirname + path)
  }
}


app.get("/", (req, res) => {
  checkIP(req, res, "/home.html")
});



app.get("/levels/openworld", (req, res) => {
  checkIP(req, res, "/levels/openworld.html")
});

app.get("/levels/tutorial", (req, res) => {
  checkIP(req, res, "/levels/tutorial.html")
});




io.on('connection', (socket) => {
  socket.on("user joined", (path) => {
    io.emit("user joined", socket.id, path)
    levelSockets.push({id : socket.id, path : path})
  })
  socket.on('disconnect', function() {
    for (var i = 0; i < levelSockets.length; i++) {
      if (levelSockets[i].id == socket.id) {
        io.emit("user left", socket.id, levelSockets[i].path)
        levelSockets.splice(i, 1)
      }
    } 
  });
  socket.on("send players", function(x, y, legrotation, right, id, path) {
    io.emit("send players", socket.id, x, y, legrotation, right, id, path)
  })
  socket.on('position', (x, y, legrotation, right, path) => {
    io.emit("update", socket.id, x, y, legrotation, right, path)
  })
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});