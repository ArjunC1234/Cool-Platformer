const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
var url = require("url");
var cu = "";

app.set("trust proxy", true);

app.use((req, res, next) => {
  if (!req.secure) return res.redirect("https://" + req.hostname + req.url);
  return next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/link", (req, res) => {
  res.sendFile(__dirname + "/link.html");
});

app.get("/chat/*", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
  cu = req.url;
});

io.on("connection", socket => {
  io.emit("connection", "User Connected," + url.parse(cu, true).pathname);
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
  socket.on("online", usidm => {
    io.emit("online", usidm);
  });
  socket.on("disconnect", () => {
    io.emit("connection", "User Disconnected," + url.parse(cu, true).pathname);
    io.emit("offline", "");
  });
});

http.listen(port, () => {
  console.log(`running at ${port}`);
});
