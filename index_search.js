var MongoDB = require('./src/class/MongoDB')();
var Config = require('./src/class/Config');
var database = Config.database;
var mongoose = require('mongoose');
var User = require("./src/module/user/user.ent");
var db;

db = MongoDB.connect(database);

db.on('error', (error) => {
	throw error
});

db.on('disconnected', () => {
	console.log('Database connection closed')
});

db.on('connected', () => {
	console.log('---------------------------------------------------')
	console.log('Database connected')
	console.log('---------------------------------------------------')
	
	/*User.findOne({ _id: "5939e9519d4e2c1a341d60ef" }, function (err, user) {
		if (err) return console.error(err.message);
		console.log(user);
		console.log('---------------------------------------------------')
	})*/	

	//var point = { type : "Point", coordinates : [0, 0] };
	//User.geoNear(point, { maxDistance : 5, spherical : true }, function(err, results, stats) {
		//console.log(results);
	//});

	var distance = 1000 / 6371;

	var query = User.findOne({
		'loc': {
			$near: [ "-49.066040", "-22.327203" ],
			$maxDistance: distance
		}
	});

	query.exec(function (err, city) {		
		console.log(err);					
		console.log(city);
	});

	/*var user = new User(); 
	user.name = "Rafael Odassi"; 
	user.email = "rafaelodassi@hotmail.com";
	user.description = "Teste";
	user.picture = "img";
	user.loc = [ "-49.066040", "-22.327203" ]; 

	user.save(function (err) {
		if (err)
			res.send(err);	
	});*/

	//User.update({ _id: "593d5f886cb55f268498a408" }, { $set: { loc: [ "-43.210503", "-22.951902" ] }}, function (err) {
		//console.log(err);
	//});
});