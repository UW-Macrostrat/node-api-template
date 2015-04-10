module.exports = {

  aSuccessfulRequest: function(res) {
    if (res.statusCode !== 200) {
      throw new Error("Bad status code");
    }
    if (res.headers["access-control-allow-origin"] !== "*") {
      throw new Error("Wrong access-control-allow-origin headers");
    }
  },

  metadata: function(res) {
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
  },

  geoJSON: function(res) {
    if(res.body.success.data.type !== "FeatureCollection") {
      throw new Error("GeoJSON was not returned");
    }
  },

  topoJSON: function(res) {
    if(res.body.success.data.type !== "Topology") {
      throw new Error("TopoJSON was not returned");
    }
  },

  json: function(res) {
    if (!res.body.success && !res.body.error) {
      throw new Error("Request did not return valid JSON");
    }
  },

  csv: function(res) {
    if (res.body.length < 10) {
      throw new Error("No CSV output recieved");
    }
  },

  atLeastOneResult: function(res) {
    if (res.body.success.data.length < 1) {
      throw new Error("Should have returned at least one result");
    } 
  }
}
 