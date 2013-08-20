var cc = require('./consoleformat.js'),
	index = require('./controllers/index.js'),
	news = require('./controllers/news.js'),
	logs = require('./controllers/logs.js');

function init(app){
	//app.get('/', index.route);
	app.get('/logs', logs.route);
	app.get('/news', news.route);

	cc.log(cc.ok("Server's routing initialized"));
};

exports.init = init;