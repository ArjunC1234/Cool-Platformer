const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (name, msg) => {
    console.log("helloooo io chat")
    let str = name + ": " + msg
    io.sockets.emit('chat message', JSON.stringify(str))
  });
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});
