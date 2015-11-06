module.exports = function() {
  var request = require("supertest");

  describe('root', require("./root"));
  describe("types", require("./types"));
  describe("hidden", require("./hidden"));
}
