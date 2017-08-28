var express = require("express");
var cors = require("cors");
var api = express.Router();

api.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT"]
}));

api.acceptedFormats = {
  "standard": {
    "json": true,
    "csv": true
  },
  "geo": {
    "geojson": true,
    "topojson": true,
    "geojson_bare": true,
    "topojson_bare": true
  },
  "bare": {
    "geojson_bare": true,
    "topojson_bare": true
  }
};

api.version = 1;
api.license = "CC-BY 4.0";

// Export the module
module.exports = api;
