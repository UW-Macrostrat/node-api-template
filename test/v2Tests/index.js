module.exports = function() {
  var request = require("supertest");

  describe("root", require("./root"));
  describe("orange", require("./orange"));
  describe("hidden", require("./hidden"));
  describe("gis", require("./gis"));
}
