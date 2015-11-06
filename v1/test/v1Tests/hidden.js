module.exports = function() {
  var request = require("supertest"),
      validators = require("../validators")
      settings = require("../settings");

  it('should return metadata', function(done) {
      request(settings.host)
        .get("/api/v1/hidden")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.json)
        .expect(validators.metadata)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });

    it('should accept an all parameter', function(done) {
      request(settings.host)
        .get("/api/v1/hidden?all")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.json)
        .expect(function(res) {
          if (res.body.success.data.length < 4) {
            throw new Error("hidden does not return the correct number of rows");
          }
        })
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });
}