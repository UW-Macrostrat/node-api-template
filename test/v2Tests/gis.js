module.exports = function() {
  var request = require("supertest"),
      validators = require("../validators")
      settings = require("../settings");

  it('should return metadata', function(done) {
    request(settings.host)
      .get("/api/v2/gis")
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
      .get("/api/v2/gis?all")
      .expect(validators.aSuccessfulRequest)
      .expect(validators.json)
      .expect(function(res) {
        if (res.body.success.data.length < 1) {
          throw new Error("gis does not return the correct number of rows");
        }
      })
      .end(function(error, res) {
        if (error) return done(error);
        done();
      });
  });
 
}