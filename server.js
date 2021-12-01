const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const net = require('net');
const client = net.connect({port: 80, host:"google.com"}, () => {
  v
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', '' + msg);
  });
});

http.listen(port, () => {
  console.log(`running at http://localhost:${port}/`);
});
