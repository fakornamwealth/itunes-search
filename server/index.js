console.log("Backend...");
const express = require("express");
const lokijs = require("lokijs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = new lokijs("local.db");
db.loadDatabase({}, () => {
  console.log(db.listCollections());
});

app.use(cors());
app.use(bodyParser.json());

var favsCollection = db.addCollection("favs");
var favs = favsCollection.find();
console.log(favs);
/*
let favs = [
  {
    test: "hi!",
  },
];
*/

app.get("/", (req, res) => {
  res.status(200).json({ data: "ok" });
  return;
});

app.post("/search", (req, res) => {
  const term = req.body.term;
  const media = req.body.media;
  console.log(media);
  fetch(
    `https://itunes.apple.com/search?term=${term}&media=${media}&country=GB`
  )
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      //setSearchResult(result.results);
      res.status(200).json(result);
    });
  return;
});

app.get("/favs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ favs }); // get from db
  return;
});

app.post("/favs", (req, res) => {
  console.log(req.body);
  //res.setHeader("Content-Type", "application/json");
  favsCollection.insert(req.body.item); // save to db
  favs = favsCollection.find();
  res.json({ favs });
  return;
});

app.delete("/favs", (req, res) => {
  console.log(req.body);
  //res.setHeader("Content-Type", "application/json");
  favsCollection
    .chain()
    .find({ collectionId: req.body.item.collectionId })
    .remove(); // delete from db
  favs = favsCollection.find();
  res.json({ favs });
  return;
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
