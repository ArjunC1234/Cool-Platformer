const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);
  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});

io.on('connection', (socket) => {
  socket.on("user joined", () => {

  })
  socket.on('disconnect', function(){
    socket.emit('user left')
  });
  socket.on('position', (x, y) => {
    io.emit("update", socket.id, x, y)
  })
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});