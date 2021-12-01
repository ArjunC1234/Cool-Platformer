const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const net = require('net');
/*var addr;
const client = net.connect({port: 80, host:"google.com"}, () => {
  addr = client.localAddress
});*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat/*', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});


io.on('connection', (socket) => {
  io.emit('connection', 'User Connected')
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
socket.on('disconnect', () => {
     io.emit('connection', 'User Disconnected')
  });  
});

http.listen(port, () => {
  console.log(`running at ${port}`);
});
