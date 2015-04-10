module.exports = function() {
  var request = require("supertest"),
      validators = require("../validators")
      settings = require("../settings");

  it('should return metadata', function(done) {
      request(settings.host)
        .get("/api/v1/types")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.json)
        .expect(validators.metadata)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });

    it('should accept a type parameter', function(done) {
      request(settings.host)
        .get("/api/v1/types?type=test")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.json)
        .expect(function(res) {
          if (res.body.success.data[0].type != "test") {
            throw new Error("types does not return requested parameter");
          }
        })
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });

    it('should output CSV', function(done) {
      request(settings.host)
        .get("/api/v1/types?type=test&format=csv")
        .expect(validators.aSuccessfulRequest)
        .expect(validators.csv)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });
}