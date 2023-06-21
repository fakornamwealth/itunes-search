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
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

// test API response
describe("API", () => {
  describe("GET /search", () => {
    it("should fetch data containing artist name and media type", async () => {
      const response = await fetch("http://localhost:3000/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          term: "john",
          media: "music",
        }),
      });
      const data = await response.json();

      const test = data.results[0];

      //console.log(test);

      expect(test).to.have.property("artistName");
      expect(test).to.have.property("kind").to.equal("song");
    });
  });
});
