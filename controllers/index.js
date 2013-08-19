var Article = require('../model/article.js').Article;

function route(req, res) {
	Article.find({}, '',{
			skip:0,
			limit:10,
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