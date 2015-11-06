# node-api-template v1

## General structure
Each route has it's own file. ````api.js```` creates the Express.js router, and the logic of each route is mapped to its URL in ````index.js````, which allows you to ````require()```` each version of the API.
