var mongoose = require("mongoose");

var EntrySchema = {
  description: String,
  imageUrl: String
}

var ListSchema = {
  title: String,
  author: String,
  entries: [EntrySchema]
}

mongoose.model("List", ListSchema);
mongoose.model("Entry", EntrySchema);

mongoose.connect("mongodb://localhost/bucketList");


module.exports = mongoose;
