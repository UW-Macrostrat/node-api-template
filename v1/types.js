var api = require("./api"),
    larkin = require("./larkin");

module.exports = function(req, res, next) {
  // If the bare route is requested, return metadata
  if (Object.keys(req.query).length < 1) {
    return larkin.info(req, res, next);
  }


  /*
   Here you could query a database, process the request, etc...
  */


  // An example of sending a response
  var data = [
    {"id": 0, "type": (req.query.type) ? req.query.type : "None given"}
  ];

  larkin.sendData(req, res, next, {
    format: (api.acceptedFormats.standard[req.query.format]) ? req.query.format : "json",
    bare: (api.acceptedFormats.bare[req.query.format]) ? true : false
  }, {
    data: data
  });

}
