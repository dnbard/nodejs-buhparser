var express = require('express'),
	cc = require('./consoleformat.js'),	
	Article = require('./model/article.js').Article, 
	parser = require('./parser/command.js');

var app = express();

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);

cc.log(cc.ok('Server started at ' + cc.bold(port) + ' port'));

parser.parseNewsFromB911();

app.get('/', function(req, res) {
	Article.find({}, '',{
			skip:0,
			limit:1,
			sort:{rawdate: -1}
		},
		function(err, docs){res.send(docs);
	});
});