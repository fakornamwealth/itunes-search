// import dependencies

import { useState } from "react";
import "./App.css";
import iTunesSearch from "./components/iTunesSearch";
import Nav from "./components/Nav";

// define hardcoded constant list of media types to generate the drop down select form control
// each media type item has a name, to be displayed on the interface, and a value, to be passed on to the API query
const mediaTypes = [
  {
    name: "Movie",
    value: "movie",
  },
  {
    name: "Podcast",
    value: "podcast",
  },
  {
    name: "Music",
    value: "music",
  },
  {
    name: "Music Video",
    value: "musicVideo",
  },
  {
    name: "Audiobook",
    value: "audiobook",
  },
  {
    name: "Short Film",
    value: "shortFilm",
  },
  {
    name: "TV Show",
    value: "tvShow",
  },
  {
    name: "Software",
    value: "software",
  },
  {
    name: "E-Book",
    value: "ebook",
  },
  {
    name: "All",
    value: "all",
  },
];

// Main app component
function App() {
  const [searchResult, setSearchResult] = useState([]); // define new state variable. initialised as an empty array.

  // function to add a new fav item to the backend.
  // this function takes one item object as input.
  function addToFavourites(item) {
    console.log("Add to favourites...");
    //setFavs([...favs, item]);
    fetch(`http://localhost:3000/favs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        //setFavs(result.favs); // set new fav item to local client state
      });
  }

  // render app
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <h1>iTunes Search</h1>
        <form
          onSubmit={async (e) => {
            // onSubmit event handler. takes term and media values from form inputs
            // and calls iTunesSearch function
            e.preventDefault();
            let results = await iTunesSearch(
              e.target.term.value,
              e.target.media.value
            );
            //console.log(results);
            setSearchResult(results); // set local client state to render search results
          }}
        >
          <input type="text" name="term" />
          <select name="media" defaultValue="all">
            {mediaTypes.map((mediaType) => {
              // render media types as a drop-down select form control
              return (
                <option key={mediaType.value} value={mediaType.value}>
                  {mediaType.name}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Search" />
        </form>
        <h2>Search Results</h2>
        <div id="results">
          {searchResult.map((result, index) => {
            // render search results
            return (
              <div className="item" key={index}>
                <div className="item-info">
                  <img src={result.artworkUrl100} />
                  {result.collectionName}, {result.artistName} ({result.kind})
                </div>
                <div className="item-actions">
                  {/* display item actions */}
                  <button
                    onClick={() => {
                      addToFavourites(result);
                      //console.log(favs);
                    }}
                  >
                    Add to favourites
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App; // export app
