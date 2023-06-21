// import dependencies
import { useState, useEffect } from "react";
import "./App.css";
import iTunesSearch from "./components/iTunesSearch";

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
  const [favs, setFavs] = useState([]); // define new favs state variable. also as an empty array.

  // function to get fav items from the backend using the fetch function
  function getFavs() {
    //const term = prompt("Enter search term:");
    fetch(`http://localhost:3000/favs`)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setFavs(result.favs); // save items to local client state
      });
  }

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
        setFavs(result.favs); // set new fav item to local client state
      });
  }

  // function to delete a fav item from the backend.
  // this function takes one item object as input.
  function removeFav(item) {
    console.log("Remove from favourites...");
    //setFavs([...favs, item]);
    fetch(`http://localhost:3000/favs`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    })
      .then((result) => result.json())
      .then((result) => {
        //console.log(result);
        // here we get a new list of faves without the deleted item
        setFavs(result.favs); // and we set it to the local client state
      });
  }

  // useEffect react hook triggers the getFavs() function once, on load
  useEffect(() => {
    getFavs();
  }, []);

  // render app
  return (
    <div className="App">
      <header className="App-header">
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
        <hr />
        <h2>Favourites</h2>
        <div id="favs">
          {favs.map((item) => {
            // render favourite items
            return (
              <div key={item.collectionId} className="item">
                <div className="item-info">{item.artistName}</div>
                <div className="item-actions">
                  <button
                    onClick={() => {
                      //console.log(item);
                      // click event handler to delete an item
                      removeFav(item);
                    }}
                  >
                    Remove
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
