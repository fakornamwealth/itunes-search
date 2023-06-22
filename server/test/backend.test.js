// import dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
const expect = chai.expect;

chai.use(chaiHttp);

// the server connects to the frontend
describe("Server", () => {
  describe("GET /", () => {
    it("should connect to the frontend", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200); // test that the response has http status 200
          done();
        });
    });
  });
});

// test API response
describe("API", () => {
  describe("GET /search", () => {
    it("should fetch data containing artist name and media type", async () => {
      // fetch data from the server
      const response = await fetch("http://localhost:3000/search", {
        method: "post", // post method to send search query parameters to the remote itunes API
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          // encode search query params as json string
          term: "john",
          media: "music",
        }),
      });

      const data = await response.json();

      const test = data.results[0]; // get first result from result set to test it has the desired properties

      //console.log(test);

      // test properties
      expect(test).to.have.property("artistName");
      expect(test).to.have.property("kind").to.equal("song");
    });
  });
});
