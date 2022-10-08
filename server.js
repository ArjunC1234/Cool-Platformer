const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
function generate(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if ( n > max ) {
          return generate(max) + generate(n - max);
  }

  max        = Math.pow(10, n+add);
  var min    = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;

  return ("" + number).substring(add); 
}
io.on('connection', (socket) => {
  io.sockets.emit('connected', )
  socket.on('disconnect', () => {
    io.sockets.emit('disconnected')
  });
  
  socket.on('chat message', (name, msg, id) => {
    io.sockets.emit('chat message', name, msg, id)
  });
});


http.listen(port, () => {
  console.log(`running at ${port}`);
});

