# node-api-template
An easy to understand, mildly opinionated, RESTish API template

### About


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

### Organization
Each version of the API functions as a self-contained module, and therefore has its own ````package.json```` and dependencies. 

### Author
[John J Czaplewski](https://github.com/jczaplew)

### License
CC-BY for all code unique to this API.
