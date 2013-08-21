var LogEntry = require('../model/logentry.js').LogEntry,
	cc = require('../consoleformat.js');

function route(req, res){
	//cc.log('Request for ' + cc.notice(req.path));

	LogEntry.find({}, '',{
		skip:0,
		/*limit:100,*/
		sort: { date:-1, time: -1 }
	}, function(err, logs){
		if (err) return res.send({'result-error':err});
		return formatOut(res, logs);
	})
};

function formatOut(res, logs){
	var out = "";
	for(var i in logs){
		out += '<div><span class="date">';
		out += logs[i].date +' - '+logs[i].time;
		out += '</span> <span class="log">';
		out += logs[i].text;
		out += '</span></div>';
	};
	res.send(out);
}

exports.route = route;