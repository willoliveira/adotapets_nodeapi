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
			.put(this.put.bind(this));

		this.bind('/user/:id/pets')
			.get(this.getPetsUser.bind(this));
	}

	getPetsUser(req, res) {
		this.entity.findOne({ "_id": req.params.id }).populate("pets").exec((err, user) => {
			if (err) res.send(err);
			res.json(user.pets);
		});
	}
}

module.exports = (router) => new UsersController(router);;