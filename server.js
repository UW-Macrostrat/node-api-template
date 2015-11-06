var express = require("express"),
    app = express();

// Load and prefix all routes with /api and appropriate version
app.use("/api/v1", require("./v1"));

// If no version specified, fall back to more current
app.use("/api", require("./v1"));

// Pretty output
app.set("json spaces", 2);


var port = process.argv[2] || 5555;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
