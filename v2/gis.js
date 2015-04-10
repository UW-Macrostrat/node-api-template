var api = require("./api"),
    larkin = require("./larkin");

module.exports = function(req, res, next) {
  // If the bare route is requested, return metadata
  if (Object.keys(req.query).length < 1) {
    return larkin.info(req, res, next);
  }


  /*

   Example: Use a user-supplied parameter to query a PostGIS table and return the result as a GeoJSON FeautreCollection using dbgeo

  if ("myParameter" in req.query) {
    larkin.queryPg("myDatabase", "SELECT id, name, ST_AsGeoJSON(geom) AS geometry FROM myTable WHERE myParameter = $1", [req.query.myParameter], function(error, data) {
      if (error) {
        return larkin.error(req, res, next, "An errror was incurred while querying the database");
      } else {
        dbgeo.parse({
          "data": data,
          "geometryType": "geojson",
          "geometryColumn": "geometry",
          "outputFormat": "geojson", 
          "callback": function(error, result) {
            if (error) {
              return larkin.error(req, res, next, "An errror was incurred while converting to GeoJSON");
            } else {
              larkin.sendCompact(result, res, null, next);
            }
          }
        });
      }
    });
  } else {
    return larkin.error(req, res, next, "myParameter is required");
  }

  */

  // An example of sending a response
  var data = [
    {"message": "View the code of v2/gis.js to see how to use a user-supplied parameter to query a PostGIS database and return GeoJSON"}
  ];

  // If a specific output format is requested, and it is an accepted format as defined in api.js, return the response in that format
  if (req.query.format && api.acceptedFormats.standard[req.query.format]) {
    larkin.sendData(data, res, (api.acceptedFormats.standard[req.query.format]) ? req.query.format : "json", next);
  
  // Otherwise, just send a compact JSON response
  } else {
    larkin.sendCompact(data, res, null, next);
  }

}
