var api = require("./api"),
    larkin = require("./larkin");

module.exports = function(req, res, next) {
  // If the bare route is requested, return metadata
  if (Object.keys(req.query).length < 1) {
    return larkin.info(req, res, next);
  }

  // An example of sending a response

  var data = [
    {"id": 0}
  ];

  if ("all" in req.query) {
    data.push(
      {"id": 1},
      {"id": 2},
      {"id": 3}
    );
  }
  
  // If a specific output format is requested, and it is an accepted format as defined in api.js, return the response in that format
  if (req.query.format && api.acceptedFormats.standard[req.query.format]) {
    larkin.sendData(data, res, (api.acceptedFormats.standard[req.query.format]) ? req.query.format : "json", next);
  
  // Otherwise, just send a compact JSON response
  } else {
    larkin.sendData(data, res, null, next);
  }

}
