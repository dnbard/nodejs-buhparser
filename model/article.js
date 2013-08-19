var db = require('../database.js'),
	mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	name: String,
	rawdate: Number,
	day: Number,
	month: Number,
	year: Number,
	link: String,
	id: String, 
	text: String, 
	source: String
});

articleSchema.methods.findSameID = function (cb) {
  return this.model('Article').find({ id: this.id }, cb);
}

articleSchema.set('autoIndex', false);

var Article = mongoose.model('Article', articleSchema);
exports.Article = Article;