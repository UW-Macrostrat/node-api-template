var api = require("./api"),
    larkin = require("./larkin");

/*
  Here you could create pools or connections to databases
*/

api.route("/")
  .get(require("./root"));

api.route("/types")
  .get(require("./types"));

api.route("/hidden")
  .get(require("./hidden"));

api.route("*")
  .get(require("./catchall"));

api.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  } else if (err.status === 404) {
    larkin.error(req, res, next, "404: Page not found", 404);
  } else {
    larkin.error(req, res, next, "500: Internal Server Error", 500);
  }
});

module.exports = api;
