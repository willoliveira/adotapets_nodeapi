var MongoDB = require('./src/class/MongoDB')();
var Config = require('./src/class/Config');
var database = Config.database;
var mongoose = require('mongoose');
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

	var Schema = mongoose.Schema;

	var usersSchema = new Schema({
		description: String,
		email: String,
		name: String,
		location: { lat: String, lon: String },
		picture: String,
		pets: {}		
	});

	var User = mongoose.model('Users', usersSchema);

	User.findOne({ 'name': 'Willian' }, function (err, user) {
		if (err) return handleError(err);

		console.log('%s', user);
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