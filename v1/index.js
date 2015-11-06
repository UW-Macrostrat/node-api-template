var api = require("./api"),
    larkin = require("./larkin");

/*
  Here you could create pools or connections to databases
*/

api.route("/")
  .get(require("./routes/root"));

api.route("/types")
  .get(require("./routes/types"));

api.route("/hidden")
  .get(require("./routes/hidden"));

api.route("*")
  .get(require("./routes/catchall"));

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
