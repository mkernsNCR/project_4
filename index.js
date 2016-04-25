var express = require("express");
var hbs = require("express-handlebars");
var db = require("./db/connection");

var app = express();

app.set("view engine", "hbs");

app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));

app.get("/", function (req, res) {
  res.render("app-welcome");
});

app.get("/lists", function (req, res) {
  res.render("lists-index", {
    lists: db.lists
  });
});

app.get("/lists/:author", function (req, res) {
  var disiredAuthor = req.params.author;
  var listOutput;
  db.lists.forEach(function (list) {
    if(desiredAuthor === list.author){
      listOutput = list;
    }
  });
  res.render("lists-show", {
    list: listOutput
  });
});

app.listen(3001, function () {
  console.log("I'm aliiiiiiiive!");
});
