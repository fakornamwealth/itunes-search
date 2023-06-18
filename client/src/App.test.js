import renderer from "react-test-renderer";
import App from "./App";
import iTunesSearch from "./iTunesSearch";

test("renders correctly", function () {
  let tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("test fetch function", async function () {
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            {
              albumTitle: "Album Title",
            },
          ],
        }),
    });

  const response = iTunesSearch("John", "all");

  //console.log(response);

  response.then((data) => {
    console.log(data);
    expect(data[0].albumTitle).toEqual("Album Title");
  });
});
