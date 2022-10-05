const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(user) {
  io.emit("online", `${user} has connected.`)
});

http.listen(port, () => {
  console.log(`running at ${port}`);
});
