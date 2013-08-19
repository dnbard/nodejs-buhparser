var express = require('express'),
	cc = require('./consoleformat.js'),	
	Article = require('./model/article.js').Article, 
	parser = require('./parser/command.js'),
	routing = require('./routing.js');

var app = express();

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);

cc.log(cc.ok('Server started at ' + cc.bold(port) + ' port'));
routing.init(app);

parser.parseNewsFromB911();

