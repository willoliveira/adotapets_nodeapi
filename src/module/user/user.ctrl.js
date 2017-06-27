var BaseController = require("../common/BaseController");
var User = require("./user.ent");

class UsersController extends BaseController {

	constructor(router) {
		super(router, User);

		this.bind('/user')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/user/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this));

		this.bind('/user/:id/pets')
			.get(this.getPetsUser.bind(this));

		this.bind('/user/email/:email')
			.get(this.getUserByEmail.bind(this));

		this.bind('/getPetByLocUser')
			.get(this.getPetByLocUser.bind(this));
	}

	getPetsUser(req, res) {
		this.entity.findOne({ "_id": req.params.id }).populate("pets").exec((err, user) => {
			if (err) res.send(err);
			res.json(user.pets);
		});
	}

	getUserByEmail(req, res) {
		this.get(req, res, { "email": req.params.email});
	}

	getPetByLocUser(req, res) {		
		var locUser = [-48.990231, -22.452031], //longitude, latitude
			distance = { min: 10, max: 100 }, //em km
			filtersPet = [
				{ $eq: [ "$$pet.size", 'large' ] },
				{ $eq: [ "$$pet.ageYears", 2 ] }
			];				

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