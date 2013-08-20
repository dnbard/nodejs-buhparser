var cc = require('./consoleformat.js');

function beforeRequest (req, res, next) {
   cc.log('Request for ' + cc.notice(req.url));
   next();
}

function errorLogging(err, req, res, next){
	cc.log(cc.error(err));
	res.send(500);
}

exports.beforeRequest = beforeRequest;
exports.errorLogging = errorLogging;