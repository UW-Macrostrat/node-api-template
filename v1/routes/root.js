var api = require("../api"),
    meta = require("../meta");

module.exports = function(req, res, next) {
  var routes = {};

  // Automatically return all available routes and their definitions as defined in meta.js
  api.stack.filter(function(d) {
    if (d.route && d.route.path !== "*" && d.route.path !== null && d.route.path.length) {
      if (meta[d.route.path] && meta[d.route.path].visible) {
        routes[d.route.path] = (meta[d.route.path] && meta[d.route.path].description) ? meta[d.route.path].description : "";
      }
    }
  });
  res.json({
    "success": {
      "v": api.version,
      "availableVersions": [1],
      "description": "This is the root of v" + api.version + " the node-api-template API",
      "routes": routes
    }
  });
}
