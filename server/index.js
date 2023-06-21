// Import dependencies
const express = require("express");
const lokijs = require("lokijs");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const db = new lokijs("local.db");

// lokijs loadDatabase() function will initialise the database
// I chose lokijs as a lightweight alternative to mongodb
db.loadDatabase({}, () => {
  // this callback function is not used
  //console.log(db.listCollections());
});

// add additional functionality to express app
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// get database collection
var favsCollection = db.addCollection("favs");
var favs = favsCollection.find();

//console.log(favs);

// define endpoints

// root endpoint only shows an "ok" message. useful to test the backend is working.
app.get("/", (req, res) => {
  res.status(200).json({ data: "ok" });
  return;
});

// this is the actual search endpoint. it takes two parameters, term and media, to perform the search on iTunes.
app.post("/search", (req, res) => {
  const term = req.body.term;
  const media = req.body.media;
  //console.log(media);
  // fetch call. query parameters are passed to the api call url string as variables
  fetch(
    `https://itunes.apple.com/search?term=${term}&media=${media}&country=GB`
  )
    .then((result) => result.json()) // transform fetch response into json format
    .then((result) => {
      //console.log(result);
      res.status(200).json(result); // set ok status and send json result
    });
  return;
});

// get favs
app.get("/favs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ favs }); // get data stored in the database and send it to the client
  return;
});

// add new fav
app.post("/favs", (req, res) => {
  //console.log(req.body);
  favsCollection.insert(req.body.item); // save to lokijs database
  favs = favsCollection.find(); // after inserting, we fetch the new inserted item
  res.json({ favs }); // and pass it back to the client to display it.
  return;
});

// delete fav endpoint
app.delete("/favs", (req, res) => {
  //console.log(req.body);
  favsCollection
    .chain()
    .find({ collectionId: req.body.item.collectionId }) // find the item to be deleted
    .remove(); // delete from database
  favs = favsCollection.find(); // get all remaining items to display on the client
  res.json({ favs }); // send remaining items to the client
  return;
});

// start express server
app.listen(3000, () => {
  console.log("Listening at port 3000");
});

// export app object for testing
module.exports = app;
