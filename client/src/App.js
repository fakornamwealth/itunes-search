import { useState, useEffect } from "react";
import "./App.css";
import iTunesSearch from "./iTunesSearch";

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

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [favs, setFavs] = useState([]);

  function getFavs() {
    //const term = prompt("Enter search term:");
    fetch(`http://localhost:3000/favs`)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setFavs(result.favs);
      });
  }

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
        setFavs(result.favs);
      });
  }

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
        console.log(result);
        setFavs(result.favs);
      });
  }

  useEffect(() => {
    getFavs();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>iTunes Search</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let results = iTunesSearch(
              e.target.term.value,
              e.target.media.value
            );
            setSearchResult(results);
          }}
        >
          <input type="text" name="term" />
          <select name="media" defaultValue="all">
            {mediaTypes.map((mediaType) => {
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
            return (
              <div className="item" key={index}>
                <div className="item-info">
                  {result.collectionName}, {result.artistName} ({result.kind})
                </div>
                <div className="item-actions">
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
            return (
              <div key={item.collectionId} className="item">
                <div className="item-info">{item.artistName}</div>
                <div className="item-actions">
                  <button
                    onClick={() => {
                      console.log(item);
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

export default App;
