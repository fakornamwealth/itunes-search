function iTunesSearch(term, media) {
  return fetch("http://localhost:3000/search", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      term,
      media,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      //setSearchResult(response.results);
      return response.results;
    });
}

export default iTunesSearch;
