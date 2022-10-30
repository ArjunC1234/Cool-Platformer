const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

var down = true
var allowedips = process.env.ALLOWED
function checkip (req, res, path) {
  for (var i = 0; i < allowedips.length; i++) {
    if (!down || req.ip == )
  }
}
app.get("/", (req, res) => {
  if (!down || req.ip == "50.47.214.254") {
    res.sendFile(__dirname + "/home.html");
  } else {
    res.sendFile(__dirname + "/maintainence.html");
  }
});



app.get("/levels/openworld", (req, res) => {
  res.sendFile(__dirname + "/levels/openworld.html");;
});



io.on('connection', (socket) => {
  
  socket.on("user joined", (path) => {
    io.emit("user joined", socket.id, path)
  })
  socket.on('user left', function(){
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