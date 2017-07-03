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

	/**
	 * TODO: deixar assim por enquanto
	 * Antes de salvar o Pet, verifica se o user existe
	 * @override 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var petData = req.body;
		User.findOne({ "_id" : req.body._userId}, (err, user) => {
			if(err) {
				res.send({
					message: new Error("Error find a user to vinculate in pet").message
				});
			}
			if (user) {
				var newPet = new this.entity(req.body);
				newPet.save((err, pet) => {
					if (err) {
						res.status(500).send({
							message: new Error("Error to save pet").message
						});
					}
					res.status(201).json({
						content: pet
					});
				})
			} else {
				res.status(412).send({
					message: new Error("User not exist!").message
				});
			}
		});
	}
}

module.exports = (router) => new PetsController(router);