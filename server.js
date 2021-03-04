const bodyParser = require("body-parser");
const express = require("express");

const app = express();

function wrap (fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req,res){
    res.status(404).sendFile(__dirname + "/404.html");
});

const listener = app.listen(process.env.PORT, async () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
