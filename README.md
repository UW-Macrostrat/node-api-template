# node-api-template
An easy to understand, mildly opinionated, RESTish API template built with Node.js

### About
Designed to minimally abstract database logic, this template scaffolds common API design decisions
and allows you to quickly distribute your data in common formats such as JSON and CSV.

### Features
+ Versioning
+ Support for various data stores
+ Tests
+ Flexibility
+ Extensibility


### Install
````
git clone https://github.com/jczaplew/node-api-template.git
cd node-api-template
npm install
npm start
````
If using MySQL or Postgres, you will need to update rename ````vx/credentials.example.js```` to ````vx/credentials.js```` and input your credentials. 

The API runs on port ````5000```` by default.

### Test
````
npm test
````

### Running in production
Look into [forever](https://github.com/foreverjs/forever) and [pm2](https://github.com/Unitech/pm2) to decide which best fits your needs.

### Organization
Each version of the API functions as a self-contained module, and therefore has its own ````package.json````, ````README````, and dependencies. 

### Author
[John J Czaplewski](https://github.com/jczaplew)

### License
CC-BY for all code unique to this API.
