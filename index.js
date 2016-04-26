var express = require("express");
// var hbs = require("express-handlebars");
var mongoose = require("./db/connection");
var app = express();

var List = mongoose.model("List");


// app.set("view engine", "hbs");
//
// app.engine(".hbs", hbs({
//   extname: ".hbs",
//   partialsDir: "views/",
//   layoutsDir: "views/",
//   defaultLayout: "layout-main"
// }));

app.use("/assets", express.static("public"));

app.use("/assets", express.static("bower_components"));

app.get("/api/lists", function (req, res) {
  List.find().then(function (lists) {
    res.json(lists);
  });
});

app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
  // res.render("app-welcome");
});

// app.get("/lists", function (req, res) {
//   res.render("lists-index", {
//     lists: db.lists
//   });
// });
//
// app.get("/lists/:author", function (req, res) {
//   var desiredAuthor = req.params.author;
//   var listOutput;
//   db.lists.forEach(function (list) {
//     if(desiredAuthor === list.author){
//       listOutput = list;
//     }
//   });
//   res.render("lists-show", {
//     list: listOutput
//   });
// });

app.listen(3001, function () {
  console.log("I'm aliiiiiiiive!");
});
