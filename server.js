var express = require('express'),
	cc = require('./consoleformat.js'),	
	Article = require('./model/article.js').Article, 
	parser = require('./parser/command.js'),
	routing = require('./routing.js'),
	bootstrap = require('./bootstrap.js')
	timers = require('./timers.js'), 
	db = require('./database.js');

cc.log('<=================================================>');
var app = express();
db.Connect(function(){
	//this code is used by appfog nodejs installation
	//var port = process.env.VCAP_APP_PORT || 3000;
	//this code is used by heroku nodejs installation
	var port = process.env.PORT || 3000;
	app.listen(port);

	cc.log(cc.ok('Server started at ' + cc.bold(port) + ' port'));

	app.use(bootstrap.beforeRequest);
	app.use(bootstrap.errorLogging);
	routing.init(app);

	timers.startup();
	timers.init(1500000);
});