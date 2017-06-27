var BaseController = require("../common/BaseController");
var User = require("./user.ent");
var Pet = require("../pet/pet.ent");

class UsersController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/user')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/user/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this)); //depois de deletar o pet, deletar a ref dele da tabela de usuario

		this.bind('/user/:id/pets')
			.get(this.getPetsUser.bind(this));

		this.bind('/user/email/:email')
			.get(this.getUserByEmail.bind(this));

		this.bind('/getPetByLocUser')
			.post(this.getPetByLocUser.bind(this));
	}

	getPetsUser(req, res) {
		Pet.find({
			_userId: req.params.id
		}, (err, pets) => {
			if (err) res.send(err);
			res.json({ 
				content: pets
			});
		});
		// this.entity.findOne({ "_id": req.params.id }).populate("pets").exec((err, user) => {
		// 	if (err) res.send(err);
		// 	res.json({ 
		// 		content: user.pets
		// 	});
		// });
	}

	getUserByEmail(req, res) {
		this.get(req, res, { "email": req.params.email});
	}

	getPetByLocUser(req, res) {					
		var filtersObj = req.body;

		var locUser = [Number(filtersObj.longitude), Number(filtersObj.latitude)],
			distance = { min: parseInt(filtersObj.minDistance), max: parseInt(filtersObj.maxDistance) },
			filtersPet = [];												
		
		var filtersPetParsed = JSON.parse(filtersObj.filtersPet);		

		for (var key in filtersPetParsed) { 			
			filtersPet.push({ $eq: [ "$$pet." + key, filtersPetParsed[key] ] });
		}		

		this.entity
			.aggregate(			
				{
					$geoNear: {
						near: { type: "Point", coordinates: locUser },			
						distanceField: "distance",
						minDistance: distance.min * 1000,
						maxDistance: distance.max * 1000,
						limit: 1,
						spherical: true
					}
				},
				{
					$lookup: {
						from: 'pets',
						localField: '_id',
						foreignField: '_userId',
						as: 'pets'
					}
				},			
				{
					$project: {
						_id: '$_id',					
						name: '$name',					
						distance: '$distance',
						pets: {
							$filter: {
								input: '$pets',
								as: 'pet',
								cond: {
									//$and, $or, $not
									$and: filtersPet
								}							
							}												
						}
					}
				},	
				{
					$project: {
						_id: '$_id',		
						name: '$name',					
						distance: '$distance',
						pet: {						
							$arrayElemAt: [ "$pets", 0 ]
						}
					}
				}
			)		
			.exec((err, user) => {
				if (err) res.send(err);
				res.json(user[0]);
			});
	}
}

module.exports = (router) => new UsersController(router);;