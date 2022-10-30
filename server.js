const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);
  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});
app.get("/game/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});

io.on('connection', (socket) => {
  socket.on("user joined", () => {
    io.emit("user joined", socket.id)
  })
  socket.on('disconnect', function(){
    io.emit('user left', socket.id)
  });
  socket.on("send players", function(x, y, legrotation, right, id) {
    io.emit("send players", socket.id, x, y, legrotation, right, id)
  })
  socket.on('position', (x, y, legrotation, right) => {
    io.emit("update", socket.id, x, y, legrotation, right)
  })
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});