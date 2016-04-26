var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

var List = mongoose.model("List");

app.use(parser.json({urlencoded: true}));
app.use("/assets", express.static("public"));

app.use("/assets", express.static("bower_components"));

app.get("/api/lists", function (req, res) {
  List.find().then(function (lists) {
    res.json(lists);
  });
});

app.get("/api/lists/:title", function (req, res) {
  List.findOne(req.params).then(function (list) {
    res.json(list);
  });
});

app.post("/api/lists", function (req, res) {
  List.create(req.body).then(function (list) {
    res.json(list);
  });
});

app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function () {
  console.log("I'm aliiiiiiiive!");
});
