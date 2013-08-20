var cc = require('./consoleformat.js'),
	parser = require('./parser/command.js');

var initialized = false;
function init(interval){
	if (initialized) return;

	cc.log(cc.ok('Timers are set to ' + (interval / 1000) + ' seconds interval'));
	setInterval(function(){
		cc.log(cc.ok('Auto parser started'));
		parser.parseNewsFromB911();
	}, interval);

	initialized = true;
};

var started = false;
function startup(){
	if (started) return;
	
	setTimeout(function (){
		parser.parseNewsFromB911();
	}, 1500);

	started = true;
};

exports.init = init;
exports.startup = startup;