var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

var List = mongoose.model("List");

app.set("port", process.env.PORT || 3001);
app.use(parser.json({urlencoded: true}));
app.use("/assets", express.static("public"));

app.use("/assets", express.static("bower_components"));

app.get("/api/lists", function (req, res) {
  List.find().then(function (lists) {
    res.json(lists);
  });
});

app.get("/api/lists/:title", function (req, res) {
  console.log("params:", req.params)
  List.findOne(req.params).then(function (list) {
    res.json(list);
  });
});

app.delete("/api/lists/:title", function (req, res) {
  List.findOneAndRemove(req.params).then(function () {
    res.json({success: true});
  });
});

// Deletes an individual entry
app.delete("/api/entries/:id", function (req, res) {
  List.findOne({"entries._id": req.params.id}).then(function(list) {
    list.entries.remove(req.params.id);
    list.save().then(function(){
      res.json(list)
    });
  });
});

app.patch("/api/lists/:title", function (req, res) {
  console.log("update list:", req.params, req.body)
  List.findOneAndUpdate(req.params, req.body, {new: true}).then(function (list) {
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

var port = process.env.PORT || 3001;
app.listen(app.get("port"), function () {
  console.log("I'm aliiiiiiiive");
  console.log("Listening on " + port);
});
