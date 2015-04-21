# node-api-template
A mildly opinionated, RESTish API template built with Node.js

### About
Designed to minimally abstract database logic, this template scaffolds common API design decisions
and allows you to quickly distribute your data in common formats such as JSON and CSV. Meant to serve as a boilerplate for distributing data.

While researching API design with Node.js, there were many questions, such as versioning and handling of relational databases, that did not have obvious answers. This template is one opinion of answers to many common API design questions.

Two "versions" are included simply to demonstrate what it looks like to work with multiple versions. You probably want to start with just one.

### Features
+ Versioning
+ Support for various data stores
+ Tests
+ Flexibility
+ Extensibility
+ The Javascript you know and love
+ Minimal abstractions


### Organization
Each version of the API functions as a self-contained module, and therefore has its own ````package.json````, ````README````, and dependencies. 


### Install
````
git clone https://github.com/jczaplew/node-api-template.git
cd node-api-template
npm install
````

If using MySQL or Postgres, you will need to update rename ````vx/credentials.example.js```` to ````vx/credentials.js```` and input your credentials. 


### Start
````
npm start
````

The API runs on port ````5000```` by default, and the root can be accessed by navigating to ````http://localhost:5000/api```` or ````http://localhost:5000/api/vX```` in your browser. 


### Testing
The tests for each version of the API can be found in ````test/vxTests````, and each route has its own test file. Functions used for testing the validity of each response can be found in ````test/validators.js````, and various settings in ````test/settings.js````.

To run the tests:

````
npm test
````

### Running in production
Both [forever](https://github.com/foreverjs/forever) and [pm2](https://github.com/Unitech/pm2) are great for keeping the API alive (and load balancing in the case of pm2).


### Author
[John J Czaplewski](https://github.com/jczaplew), with inspiration and assistance from [Puneet Kishor](http://punkish.org) and [Shanan Peters](http://strata.geology.wisc.edu).

### Funding
Development supported by NSF CAREER EAR-1150082 and NSF ICER-1440312.

### License
CC-BY for all code unique to this API.
