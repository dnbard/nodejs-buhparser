var clc = require('cli-color');

var now = function(){
	var date = new Date();
	var hrs = date.getHours().toString();
	var min = date.getMinutes().toString();
	var sec = date.getSeconds().toString();

	if (hrs.length < 2) hrs = '0' + hrs;
	if (min.length < 2) min = '0' + min;
	if (sec.length < 2) sec = '0' + sec;

	return hrs + ':' + min + ':' + sec;
};

var log = function(str){
	console.log(now() + ' ' + str);
};

exports.error = clc.red.bold;
exports.warn = clc.yellow;
exports.ok = clc.green;
exports.notice = clc.blue;
exports.now = now;
exports.log = log;
exports.bold = clc.bold;