var request = require('request'),
	cheerio = require('cheerio'),
	cc = require('../consoleformat.js'),
	crypto = require('crypto'),
	db = require('../database.js'), 
	mongoose = require('mongoose'), 
	Article = require('../model/article.js').Article;

exports.parseNewsFromB911 = parseNewsFromB911;
function parseNewsFromB911(){
	var url = 'http://buhgalter911.com';
	requestUrl(url, parseNewsFromB911_requestClbk);
}

function parseNewsFromB911_requestClbk(url, resp, body){
	$ = cheerio.load(body);
	var news_elements = $('#mainnews_content').find('tr');
	var newsCount = news_elements.length - 2;
	cc.log('News911: found ' + newsCount + ' news elements');
	news_elements.each(function (i, elem) {
		if (i >= newsCount) return false;
		var artName = $(this).find('a').text();
		var artDate = $(this).find('.newsDate').text();
		var tempDate = artDate.split('.');
		var artDay = tempDate[0];
		var artMonth = tempDate[1];
		var artYear = 20 + tempDate[2];

		var article = new Article({				
			name: artName,
			rawdate: artYear * 100000 + artMonth * 1000 + artDay,
			day: artDay,
			month: artMonth,
			year: artYear,
			link: url + $(this).find('a').attr('href'),
			id: crypto.createHash('md5').update(artName).digest('hex'),
			source: 'Бухгалтер 911'
		});

		Article.findOne({'id':article.id}, function(err, art){
			if (!err && !art)
				requestArticle(article, parseArticleFromB911_requestClbk);
			else cc.log("News911: Skip article id=" + art.id);
		})
		
		
	});
}

function parseArticleFromB911_requestClbk(article, resp, body){
	var url = article.link;
	$ = cheerio.load(body);
	var element = $('.articleText').find('div');
	if (element.length <= 10) return false;
	article.text = element.text().replace(/(\r\n|\n|\r)/gm,"");
	article.save(function(err){
		if (err) cc.log(cc.error("Can't save article id=",article.id));
		else {
			cc.log('News911: saved '+ article.id);
		}
	});
}

function requestArticle(article, callback){
	var url = article.link;
	cc.log('Request send to ' + url);
	request(url, function(err, resp, body){
		if (err){
			cc.log(cc.error("Couldn't request " + url));
		} else {
			callback(article, resp, body);
		}
	});
}

function requestUrl(url, callback){
	cc.log('Request send to ' + url);
	request(url, function(err, resp, body){
		if (err){
			cc.log(cc.error("Couldn't request " + url));
		} else {
			callback(url, resp, body);
		}		
	});
}