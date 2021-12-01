const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const net = require('net');
/*var addr;
const client = net.connect({port: 80, host:"google.com"}, () => {
  addr = client.localAddress
});*/
var usid;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat/*', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
  usid = 'user' + Math.floor(Math.random()*100);
});


io.on('connection', (socket) => {
  io.emit('connection')
  socket.on('chat message', msg => {
    if(msg.match(/\\name\s(.*)/gims)){
      usid = msg.replace(/\\name\s(.*)/gims, '$1');
      console.log(msg.replace(/\\name\s(.*)/gims, '$1'))
    }
    io.emit('chat message', usid + ': ' + msg);
  });
});

http.listen(port, () => {
  console.log(`running at ${port}`);
});
