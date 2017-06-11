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
	console.log('Database connected')
	
	User.findOne({ _id: "5939e9519d4e2c1a341d60ef" }, function (err, user) {
		if (err) return handleError(err);		
		console.log(user);
	})

	/*var usersResult = db.users.find(
		{
			location: {
				$nearSphere: {
					$geometry: {
						type : "Point",
						coordinates : [ -73.9667, 40.78 ]
					},
					$minDistance: 1000,
					$maxDistance: 5000
				}
			}
		}
	)*/

	//console.log(usersResult);
});