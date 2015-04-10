var async = require("async"),
    csv = require("express-csv"),
    api = require("./api"),
    defs = require("./defs");

/* 

Optional database modules

var mysql = require("mysql"),
    pg = require("pg"),
    credentials = require("./credentials");
*/

(function() {
  var larkin = {};

  // If you want to use MySQL / MariaDB
  larkin.connectMySQL = function() {
    // Non-blocking FTW
    this.pool = mysql.createPool(credentials.mysql);

    // Verify a connection has been made
    this.pool.getConnection(function(error, connection) {
      if (error) {
        throw new Error("Unable to connect to MySQL. Please check your credentials");
      };
    });

    this.pool.on("connection", function(connection) {
      // We could in theory take note of each query for analytics here...
      // Or set a session, etc...
    });
  };

  larkin.queryMySQL = function(sql, params, callback, send, res, format, next) {
    this.pool.getConnection(function(err, connection) {
      connection.query(sql, params, function(error, result) {
        // Remove the connection
        connection.destroy();
        if (error) {
          if (callback) {
            callback(error);
          } else {
            this.error(res, next, "Error retrieving from MySQL.", error);
          }
        } else {
          if (send) {
            this.sendData(result, res, format, next);
          } else {
            callback(null, result);
          }
        }
      }.bind(this));
    }.bind(this));
  };


  // If you want to use Postgres  
  larkin.queryPg = function(db, sql, params, callback, send, res, format, next) {
    pg.connect("postgres://" + credentials.pg.user + "@" + credentials.pg.host + "/" + db, function(err, client, done) {
      if (err) {
        this.log("error", "error connecting - " + err);
        callback(err);
      } else {
        var query = client.query(sql, params, function(err, result) {
          done();
          if (err) {
            this.log("error", err);
            callback(err);
          } else {
            if (send) {
              this.sendData(result, res, format, next);
            } else {
              callback(null, result);
            }
          }

        }.bind(this));
       // console.log(query);
      }
    }.bind(this));
  };


  // Return data to the client
  larkin.sendData = function(data, res, format, next) {
    if (format === "csv") {
      res.csv(data, true)
    } else {
      if (data.length > 5) {
        res
          .set("Content-type", "application/json; charset=utf-8")
          .send(JSON.stringify({"success": {"v": api.version,"data": data}}, null, 0));
        } else {
          res.json({
            "success": {
              "v": api.version,
              "data": data
            }
          });
        }
    }
   };

   // Identical to sendData, but removes padding
  larkin.sendCompact = function(data, res, format) {
    if (format === "csv") {
      res.csv(data, true);
    } else {
      res
        .set("Content-type", "application/json; charset=utf-8")
        .send(JSON.stringify({"success": {"v": api.version,"data": data}}, null, 0));
    }
  };
  
  // Identical to sendCompact, but removes standard wrapper
  larkin.sendBare = function(data, res, next) {
    res
      .set("Content-type", "application/json; charset=utf-8")
      .send(JSON.stringify(data, null, 0));
   };


  larkin.info = function(req, res, next) {
    this.defineRoute(req.route.path, function(definition) {
      res.json({
        "success": definition
      });
    });
  };

  // Send an error to the client
  larkin.error = function(req, res, next, message, code) {
    var responseMessage = (message) ? message : "Something went wrong. Please contact the administrator.";
    if (code && code === 500 || code === 404) {
      res
        .status((code) ? code : 200)
        .json({
          "error": {
            "message": responseMessage
          }
        });
    } else {
      this.defineRoute(req.route.path, function(definition) {
        res
          .status((code) ? code : 200)
          .json({
            "error": {
              "v": api.version,
              "message": responseMessage,
              "about": definition
            }
          });
      });
    }
        
  };

  larkin.log = function(type, message) {
    console.log(type, message);
  };

  // Will return all field definitions
  larkin.defineFields = function(route, callback) {
    var routeDefs = {}
    async.each(defs[route].options.fields, function(field, callback) {
      if (defs.define.hasOwnProperty(field)) {
        routeDefs[field] = defs.define[field];
      } else {
        routeDefs[field] = ""
      }
      callback()
    }, function(error, result) {
      callback(routeDefs);
    });
  };

  // Get the metadata for a given route
  larkin.defineRoute = function(route, callback) {
    this.defineFields(route, function(fields) {
      var routeDefinition = {
        "v": api.version,
        "description": defs[route].description,
        "options": {
          "parameters": defs[route].options.parameters,
          "output_formats": defs[route].options.output_formats,
          "examples": defs[route].options.examples
        }
      };
      routeDefinition.options.fields = fields;
      callback(routeDefinition);
    }); 
  };


  module.exports = larkin;

}());
