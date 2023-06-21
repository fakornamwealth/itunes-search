// function to fetch search results from the backend
function iTunesSearch(term, media) {
  return fetch("http://localhost:3000/search", {
    method: "post", // post method is used to send search query parameters to the backend
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      // send search query parameters as a json formatted string
      term,
      media,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      //console.log(response);
      return response.results;
    });
}

export default iTunesSearch; // export function for usage and testing
