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
			.put(this.put.bind(this));
	}

	//TODO: deixar assim por enquanto
	/**
	 * Salva o pet e ja guarda referencia dele no array de pets do user
	 * @override 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var petData = req.body;
		User.findOne({ "_id" : req.body._userId}, (err, user) => {
			if(err) res.send(err);
			if (user) {
				var newPet = new this.entity(req.body);
				newPet.save((err, pet) => {
					user.pets.push(pet._id);
					user.save(function(err) {
						if(err) res.send(err);
						res.json(pet);
					});
				})
			}
		});
	}
}

module.exports = (router) => new PetsController(router);