var assert = require("assert"),
    should = require("should"),
    request = require("supertest"),
    async = require("async");

var host = "http://localhost:5000";

function aSuccessfulRequest(res) {
  if (res.statusCode !== 200) {
    throw new Error("Bad status code");
  }
  if (res.headers["access-control-allow-origin"] !== "*") {
    throw new Error("Wrong access-control-allow-origin headers");
  }
}

function metadata(res) {
  // Make sure all the key metadata sections exist
  if (!res.body.success.description) {
    throw new Error("Route description missing");
  }
  if (!res.body.success.options) {
    throw new Error("Route options missing");
  }
  if (!res.body.success.options.parameters) {
    throw new Error("Route parameters missing");
  }
  if (!res.body.success.options.output_formats) {
    throw new Error("Route output formats missing");
  }
  if (!res.body.success.options.examples) {
    throw new Error("Route examples missing");
  }
  if (!res.body.success.options.fields) {
    throw new Error("Route fields missing");
  }

  // Make sure the metadata sections are formatted properly
  if (!(res.body.success.options.parameters instanceof Object)) {
    throw new Error("Something wrong with parameters object");
  }
  if (!(res.body.success.options.output_formats instanceof Array)) {
    throw new Error("Something wrong with output formats array");
  }
  if (!(res.body.success.options.examples instanceof Array)) {
    throw new Error("Something wrong with examples array");
  }
  if (!(res.body.success.options.fields instanceof Object)) {
    throw new Error("Something wrong with fields object");
  }

  // Make sure metadata sections are populated
  if (Object.keys(res.body.success.options.parameters).length < 1) {
    throw new Error("Route is missing parameters");
  }
  if (res.body.success.options.output_formats.length < 1) {
    throw new Error("Route is missing output formats");
  }
  if (res.body.success.options.examples.length < 1) {
    throw new Error("Route is missing examples");
  }
  if (Object.keys(res.body.success.options.fields).length < 1) {
    throw new Error("Route is missing field definitions");
  }
}

function geoJSON(res) {
  if(res.body.success.data.type !== "FeatureCollection") {
    throw new Error("GeoJSON was not returned");
  }
}

function topoJSON(res) {
  if(res.body.success.data.type !== "Topology") {
    throw new Error("TopoJSON was not returned");
  }
}

function json(res) {
  if (!res.body.success && !res.body.error) {
    throw new Error("Request did not return valid JSON");
  }
}

function csv(res) {
  if (res.body.length < 10) {
    throw new Error("No CSV output recieved");
  }
}

function atLeastOneResult(res) {
  if (res.body.success.data.length < 1) {
    throw new Error("Should have returned at least one result");
  } 
}

describe('Routes', function() {
/* Root route */
  describe('root', function() {
    it('should return a list of all visible routes', function(done) {
      request(host)
        .get("/api")
        .expect(aSuccessfulRequest)
        .expect(json)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });
  });

/* types */
  describe("types", function() {
    it('should return metadata', function(done) {
      request(host)
        .get("/api/types")
        .expect(aSuccessfulRequest)
        .expect(json)
        .expect(metadata)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });

    it('should accept a type parameter', function(done) {
      request(host)
        .get("/api/types?type=test")
        .expect(aSuccessfulRequest)
        .expect(json)
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
      request(host)
        .get("/api/types?type=test&format=csv")
        .expect(aSuccessfulRequest)
        .expect(csv)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });
  });

/* hidden */
  describe("hidden", function() {
    it('should return metadata', function(done) {
      request(host)
        .get("/api/hidden")
        .expect(aSuccessfulRequest)
        .expect(json)
        .expect(metadata)
        .end(function(error, res) {
          if (error) return done(error);
          done();
        });
    });

    it('should accept an all parameter', function(done) {
      request(host)
        .get("/api/hidden?all")
        .expect(aSuccessfulRequest)
        .expect(json)
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
  });

});