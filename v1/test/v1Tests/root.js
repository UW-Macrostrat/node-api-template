module.exports = function() {
  var request = require("supertest"),
      validators = require("../validators")
      settings = require("../settings");

  it('should return a list of all visible routes', function(done) {
      request(settings.host)
        .get("/api/v1")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.json)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });
}
