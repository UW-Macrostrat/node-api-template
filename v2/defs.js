(function() {
  var async = require("async");

  var defs = {};

  // Instead of adding metadata to each route in api.js, we are going to do it here
  defs["/orange"] = {
    "description": "This doesn't exist in v1",
    "visible": true,
    "options": {
      "parameters": {
        "type": "text, a random string to return in the output",
        "format": "string, desired output format"
      },
      "output_formats": ["json", "csv"],
      "examples": [
        "/api/orange?type=MyFavoriteColorIsGreen",
        "/api/orange?type=Cats&format=csv",
      ],
      "fields": [
        "oid",
        "type"
      ]
    }
  };


  defs["/gis"] = {
    "description": "View the code in v2/gis.js to see how to query a PostGIS database and return GeoJSON",
    "visible": true,
    "options": {
      "parameters": {
        "all": "Show the response",
        "format": "string, desired output format"
      },
      "output_formats": ["json", "csv"],
      "examples": [
        "/api/gis?all"
      ],
      "fields": [
        "message"
      ]
    }
  };


  defs["/hidden"] = {
    "description": "This route is hidden but available to use. Available in both v1 and v2.",
    "visible": false,
    "options": {
      "parameters": {
        "all": "boolean, whether everything should be returned or not",
        "format": "string, desired output format"
      },
      "output_formats": ["json", "csv"],
      "examples": [
        "/api/hidden?all",
      ],
      "fields": [
        "id"
      ]
    }
  };


  // This is the primary dictionary for all field definitions
  defs.define = {
    "id": "integer, unique identifier",
    "type": "string, a random user provided string"
  };

  module.exports = defs;
}());
