const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);
  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});



app.get("/game/as-easy-as-it-gets", (req, res) => {
  res.sendFile(__dirname + "/levels/as-easy-as-it-gets");
});
app.get("/game/1", (req, res) => {
  res.sendFile(__dirname + "/levels/as-easy-as-it-gets");
});




io.on('connection', (socket) => {
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