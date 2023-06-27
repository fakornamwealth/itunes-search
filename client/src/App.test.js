// import dependencies
import renderer from "react-test-renderer";
import App from "./App";
import iTunesSearch from "./components/iTunesSearch";

// snapshot test
test("renders correctly", function () {
  let tree = renderer.create(<App />).toJSON(); // get json object representing the app
  expect(tree).toMatchSnapshot(); // compare to snapshot
});

// unit test
test("test fetch function", async function () {
  // overwrite native fetch function with a mock version
  // this will simulate a promise being returned with test data
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            {
              albumTitle: "Album Title", // test data
            },
          ],
        }),
    });

  // call our application's fetch function
  // the mock fetch function will be used instead of the native one
  const response = iTunesSearch("John", "all");

  //console.log(response);

  response.then((data) => {
    console.log(data);
    expect(data[0].albumTitle).toEqual("Album Title"); // compare result with test data
  });
});
