var express = require("express"),
    app = express();

// Load and prefix all routes with /api and appropriate version
app.use("/api/v1", require("./v1"));
app.use("/api/v2", require("./v2"));

// If no version specified, fall back to more current
app.use("/api", require("./v2"));

// Pretty output
app.set("json spaces", 2);


var port = process.argv[2] || 5000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
