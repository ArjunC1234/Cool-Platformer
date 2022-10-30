const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

var bypass = false
var down = false

app.get("/", (req, res) => {
  if (bypass || !down) {
    res.sendFile(__dirname + "/home.html");
  } else {
    res.sendFile(__dirname + "/maintainence.html");
  }
});



app.get("/levels/openworld", (req, res) => {
  res.sendFile(__dirname + "/levels/openworld.html");;
});



io.on('connection', (socket) => {
  socket.on("bypass", function (bool) {
    bypass = bool
  })
  
  
  
  socket.on("user joined", (path) => {
    io.emit("user joined", socket.id, path)
  })
  socket.on('disconnect', function(){
    io.emit('user left', socket.id)
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