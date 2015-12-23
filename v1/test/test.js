var should = require("should");
var settings = require("./settings");
var app = require("../../server");

app.port = settings.port;

app.start();

describe('v1', require("./v1Tests"));
