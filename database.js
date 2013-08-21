var cc = require('./consoleformat.js'),
	mongoose = require('mongoose');

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
    }
}

var generate_mongo_url = function(obj){
    /*obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }*/
    return "mongodb://first:jqueen@paulo.mongohq.com:10087/buh-db";
}

var mongourl = generate_mongo_url(mongo);
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', function(){
	cc.log(cc.error("Can't connect to " + mongourl));
});
db.once('open', function() {
	cc.log(cc.ok('Connected to ' + cc.bold(mongourl)));
});