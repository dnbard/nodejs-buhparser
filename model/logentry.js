var mongoose = require('mongoose');

var logentrySchema = mongoose.Schema({
	text: String,
	time: String,
	date: String
});

logentrySchema.set('autoIndex', false);

var LogEntry = mongoose.model('LogEntry', logentrySchema);
exports.LogEntry = LogEntry;