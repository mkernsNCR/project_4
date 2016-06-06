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

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URL);
}else{
  mongoose.connect("mongodb://localhost/bucketList");
}

module.exports = mongoose;
