var mongoose = require("./connection");
var seedData = require("./seeds");

var List = mongoose.model("List");

List.remove().then(function () {
  List.create(seedData).then(function () {
    process.exit();
  });
});
