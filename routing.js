var cc = require('./consoleformat.js'),
	index = require('./controllers/index.js'),
	news = require('./controllers/news.js');

function init(app){
	app.get('/', index.route);

	cc.log(cc.ok("Server's routing initialized"));
};

exports.init = init;