var api = require("./api"),
    defs = require("./defs");

module.exports = function(req, res, next) {
  var routes = {};

  // Automatically return all available routes and their definitions as defined in defs.js
  api.stack.filter(function(d) {
    if (d.route && d.route.path !== "*" && d.route.path !== null && d.route.path.length) {
      if (defs[d.route.path] && defs[d.route.path].visible) { 
        routes[d.route.path] = (defs[d.route.path] && defs[d.route.path].description) ? defs[d.route.path].description : "";
      }
    }
  });
  res.json({
    "success": {
      "v": api.version,
      "availableVersions": [1, 2],
      "description": "This is the root of v" + api.version + " the node-api-template API",
      "routes": routes
    }
  });
}
