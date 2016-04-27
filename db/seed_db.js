var mongoose = require("./connection");
var seedData = require("./seeds");

var List = mongoose.model("List");
var Entry = mongoose.model("Entry");
console.log("seeding db...")
List.remove().then(function () {
  List.create(seedData).then(function () {
    addOtherEntries();
  });
});

function addOtherEntries(){
  console.log("adding Other entry...")
  List.findOne({ title: 'Project X' }).then(function(project_x){
    console.log("Adding:", project_x);

    project_x.entries.push(
      new Entry({description: "Mt. Hood"})
    )
    console.log("Saving:", project_x);
    project_x.save(function (err, response) {
      console.log("Saved:", response, err);
      process.exit()
    })
  }).catch(function(err){
    console.log("err:", err);
    process.exit()
  })
}
