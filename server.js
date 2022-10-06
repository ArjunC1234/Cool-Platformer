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
  socket.on('chat message', (arr) => {
    let str = arr[1] + ": " + arr[0]
    io.sockets.emit('chat message', str)
  });
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});
