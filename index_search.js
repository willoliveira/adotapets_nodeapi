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
	var distance = {
		min: 0,
		max: 16
	};

	User.find({
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
    }, function(err, results) {
		if (err)
			console.log("ERRO: ", err.message);	

		console.log("SUCESSO: ", results);
	});

	//User.update({ _id: "593d5f886cb55f268498a408" }, { $set: { loc: [ "-43.210503", "-22.951902" ] }}, function (err) {
		//console.log(err);
	//});

	/*var user = new User(); 
	user.name = "Rafael Odassi"; 
	user.email = "rafaelodassi@hotmail.com";
	user.description = "loc - Agudos";
	user.picture = "path_img";
	user.loc = {
		type: "Point",
		coordinates: ["-48.990231", "-22.452031"] //Agudos
	}; 		

	user.save(function (err) {
		if (err)
			console.log(err.message);	
	});

	var user = new User(); 
	user.name = "Will"; 
	user.email = "will@hotmail.com";
	user.description = "loc - Lecom";
	user.picture = "path_img";
	user.loc = {
		type: "Point",
		coordinates: ["-49.066042", "-22.327201"] //Lecom
	}; 	

	user.save(function (err) {
		if (err)
			console.log(err.message);	
	});

	var user = new User(); 
	user.name = "Lula"; 
	user.email = "lula@hotmail.com";
	user.description = "loc - Brasília";
	user.picture = "path_img";
	user.loc = {
		type: "Point",
		coordinates: ["-47.860738", "-15.798912"] //Brasilia
	}; 		

	user.save(function (err) {
		if (err)
			console.log(err.message);	
	});*/
});