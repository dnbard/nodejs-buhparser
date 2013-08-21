var clc = require('cli-color'),
	LogEntry = require('./model/logentry.js').LogEntry,
	ansiTrim = require('cli-color/lib/trim');

function now(){
	var date = new Date();
	var hrs = date.getUTCHours().toString();
	var min = date.getUTCMinutes().toString();
	var sec = date.getUTCSeconds().toString();

	if (hrs.length < 2) hrs = '0' + hrs;
	if (min.length < 2) min = '0' + min;
	if (sec.length < 2) sec = '0' + sec;

	return hrs + ':' + min + ':' + sec;
};

function date(){
	var date = new Date();
	var day = date.getUTCDate().toString();
	var month = (date.getUTCMonth() + 1).toString();
	var year = date.getFullYear().toString();

	if (day.length < 2) day = '0' + day;
	if (month.length < 2) month = '0' + month;
	return year + '/' + month + '/' + day;
}

function msec(){
	var date = new Date();
	var msec = date.getUTCMilliseconds().toString();
	while (msec.length <= 2) msec = '0' + msec;
	return msec;
}

function log(str){
	console.log(now() + ' ' + str);

	var log = new LogEntry({
		text: ansiTrim(str),
		date: date(),
		time: now() + ':' + msec()
	});
	log.save();
};

exports.error = clc.red.bold;
exports.warn = clc.yellow;
exports.ok = clc.green;
exports.notice = clc.cyan;
exports.now = now;
exports.log = log;
exports.bold = clc.bold;