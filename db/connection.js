var mongoose = require("mongoose");

var ListSchema = {
  title: String,
  author: String
}

mongoose.model("List", ListSchema);

mongoose.connect("mongodb://localhost/bucketList");


module.exports = mongoose;
