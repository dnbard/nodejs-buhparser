var express = require('express');
var cc = require('./consoleformat.js');

var app = express();

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);

cc.log(cc.ok('Server started at ' + cc.bold(port) + ' port'));

var parser = require('./parser/command.js');
parser.parseNewsFromB911();