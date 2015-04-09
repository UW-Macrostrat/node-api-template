# node-api-template v1

## General structure
Each route has it's own file. ````api.js```` creates the Express.js router, and the logic of each route is mapped to its URL in ````index.js````, which allows you to ````require()```` each version of the API.


## larkin.js
Larkin is a collection of reusable conviniences and utilities used in every route.


### .connectMySQL
Called once when the API is started - creates a connection to MySQL using the credentials supplied in ````credentials.js````.


### .queryPg(database, sql, parameters, callback, send, res, format)
Runs a query on a Postgres database given a ````database````, ````sql````, ````parameters````, and a ````callback````. Can optionally directly send the data given ````send````, a boolean, ````res````, and a desired ouput ````format````. Unlike MySQL, node-pg does not create a pool to draw connections from, but rather creates a new connection for each query.


### .query(sql, parameters, callback, send, res, format)
Runs a query on a database (supplied in ````credentials.js````) using the supplied parameters. As with ````.queryPg````, result can be directly sent to the client if ````send````, ````res````, and ````format```` are supplied.


### .sendData(data, res, format)
Sends ````data```` to the client with an encoding specified for ````format````.


### .sendCompact(data, res, format)
Same as ````.sendData````, but removes all whitespace from the response for an ugly, but compact response. Ideal for routes that always return large amounts of data, such as those that return geographic data.


### .sendBare(data, res)
Same as ````.sendCompact````, but removes the response wrapper (````{"success": {....}}````). Used for formats ````geojson_bare```` and ````topojson_bare```` to increase interoperability with other tools and utilities such as QGIS.


### .info(request, res)
Given a request, return a definition of the route to the client. Used for the base of all routes, i.e. ````/units````.


### .error(req, res, next, message, code)
Return an error and route definition to the client with an optional ````message```` and error code. Used when bad requests are made, usually with unknown or unusable parameters.


### .log(type, messsage)
Simply log something to the console. A convinience for ````console.log````.


### .defineFields(route, callback)
Fetches and returns all field definitions for a given route. Always called by ````.defineRoute````.


### .defineRoute(route, callback)
Forms a definition response for a given route. Fetches all field defintions using ````.defineFields````. Usually called by ````.error````.

