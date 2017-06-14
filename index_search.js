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
	
	//em km
	/*var distance = {
		min: 0,
		max: 16
	};

	User
		.find({
			loc: {
				'$near': {         		
					'$geometry': {
						type: 'Point',
						coordinates: [ "-48.990231", "-22.452031" ]
					},
					'$minDistance': distance.min,
					'$maxDistance': distance.max * 1000				
				}
			} 
		})
		.limit(1)
		.exec(function (err, result) {
			if (err) console.log(err.message);			
			console.log(result);
		});*/
	

	User
		.aggregate([			
			{
				'$lookup':{
					from: 'pets',
					localField: '_id',
					foreignField: 'userId',
					as: 'user_pets'
				}
			}			
		])
		.exec(function (err, result) {
			if (err) console.log(err.message);
			console.log(result);
		});

	/*var pet = new Pet(); 
	pet.userId = "594029a1261c1c28cccaa163";
	pet.name = "Lulão";
	pet.about = "Eu sou um pet topzera";
	pet.ageMonths = 6;
	pet.ageYears = 2;
	pet.breed = "Vira lata";
	pet.genre = "male";
	pet.kind = "dog";	
	pet.size = "large";	
	pet.pictures = [];

	pet.save(function (err) {
		if (err)
			console.log(err.message);	
	});*/
});