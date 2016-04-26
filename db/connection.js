var mongoose = require("mongoose");
// var seedData = require("./seeds.json");

var ListSchema = {
  title: String,
  author: String
}

mongoose.model("List", ListSchema);

mongoose.connect("mongodb://localhost/bucketList");


module.exports = mongoose;
