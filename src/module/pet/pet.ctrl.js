var BaseController = require("../common/BaseController");
var Pet = require("./pet.ent");
var User = require("../user/user.ent.js");

class PetsController extends BaseController{

	constructor(router) {
		super(router, Pet);

		this.bind('/pet')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/pet/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}

	delete() {
		this.entity.findOne({ "_id": req.params.id }, (err, pet) => {
			User.findOne({ "_id": pet.userId }, (err, user) => {
				user.pets.splice( user.pets.indexOf(pet._id), 1 )
				User.findOneAndUpdate({ _id: user.id }, user, (err) => {
					this.entity.remove({ "_id": pet._id }, (err, entity) => {
						if (err) res.send(err);
						res.json({ 
							content: {
								id: req.params.id
							}
						});
					});
				});
			});
		});
	}

	/**
	 * TODO: deixar assim por enquanto
	 * Salva o pet e ja guarda referencia dele no array de pets do user
	 * @override 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var petData = req.body;
		User.findOne({ "_id" : req.body.userId}, (err, user) => {
			if(err) {
				res.send({
					Error: new Error("Error find a user to vinculate in pet").message
				});
			}
			if (user) {
				var newPet = new this.entity(req.body);
				newPet.save((err, pet) => {
					user.pets.push(pet._id);
					user.save(function(err) {
						if(err) res.send(err);
						res.json({
							content: pet
						});
					});
				})
			} else {
				res.send({
					Error: new Error("User not exist!").message
				});
			}
		});
	}
}

module.exports = (router) => new PetsController(router);