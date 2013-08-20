var Article = require('../model/article.js').Article;

function route(req, res) {
	var __limit = req.param('limit');
	if (!__limit) __limit = 10;

	var __skip = req.param('skip');
	if (!__skip) __skip = 0;

	Article.find({}, '',{
			skip: __skip,
			limit: __limit,
			sort:{rawdate: -1}
		},
		function(err, docs){
			Article.count({}, function(err, count){
				res.send({
					'count': count,
					'items': docs
				})
			})
		});
};

exports.route = route;