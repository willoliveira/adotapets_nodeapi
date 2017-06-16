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
		
	User
		.aggregate(			
			{
				$geoNear: {
					near: { type: "Point", coordinates: [-48.990231, -22.452031] },			
					distanceField: "distance",
					minDistance: 10 * 1000,
					maxDistance: 100 * 1000,
					limit: 1,
					spherical: true
				}
			},
			{
				$lookup: {
					from: 'pets',
					localField: '_id',
					foreignField: '_userId',
					as: 'user_pets'
				}
			},
			{
				$group: {
					_id: '$_id',
					user_pets: {
						'$push': '$user_pets'
					}
				}
			},
			{
				$unwind: '$user_pets'
			}			
		)		
		.exec(function (err, result) {
			if (err) console.log(err.message);			
			console.log(result[0]);
		});	
});