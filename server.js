var express = require("express"),
    app = express();

// Load and prefix all routes with /api and appropriate version
app.use("/api/v1", require("./v1"));

// If no version specified, fall back to more current
app.use("/api", require("./v1"));

// Pretty output
app.set("json spaces", 2);

app.port = process.argv[2] || 5500;

app.start = function() {
  app.listen(app.port, function() {
    console.log("Listening on port " + app.port);
  });
}

if (!module.parent) {
  app.start();
}


module.exports = app;
