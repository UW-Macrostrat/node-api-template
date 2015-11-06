(function() {
  var defs = {};

  // Instead of adding metadata to each route in api.js, we are going to do it here
  defs["/types"] = {
    "description": "Optionally provide a type parameter to see it in the response. Doesn't exist in v2.",
    "visible": true,
    "options": {
      "parameters": {
        "type": "text, a random string to return in the output",
        "format": "string, desired output format"
      },
      "output_formats": ["json", "csv"],
      "examples": [
        "/api/types?type=MyFavoriteColorIsGreen",
        "/api/types?type=Cats&format=csv",
      ],
      "fields": [
        "id",
        "type"
      ]
    }
  };


  defs["/hidden"] = {
    "description": "This route is hidden but available to use. Available in both v1 and v2",
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
