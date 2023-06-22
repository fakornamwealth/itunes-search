import { useState, useEffect } from "react";
import "../App.css";
import Nav from "./Nav";

function Favs() {
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

  // function to delete a fav item from the backend.
  // this function takes one item object as input.
  function removeFav(item) {
    console.log("Remove from favourites...");
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

  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <h2>Favourites</h2>
        <div id="favs">
          {favs.map((item) => {
            // render favourite items
            return (
              <div key={"fav-" + item.$loki} className="item">
                <div className="item-info">{item.artistName}</div>
                <div className="item-actions">
                  <button
                    onClick={() => {
                      console.log(item);
                      // click event handler to delete an item
                      removeFav(item.$loki); // index plus one matches the database index
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

export default Favs;
