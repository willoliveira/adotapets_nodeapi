var Pet = require("./pet.ent");

class PetsController {

	constructor(router) {
		router.route('/pet').get(this.get);
		router.route('/pet').post(this.post);

		router.route('/pet/:id').get(this.get);
	}

	post(req, res) {
		var newPet = new Pet(req.body);
		newPet.save((err, task) => {
			if (err) res.send(err);
			res.json(task);
		});
	}

	get(req, res) {
		var request;
		if (req.params.id) {
			request = Pet.findById.bind(Pet, req.params.id);
		}
		else {
			request = Pet.find.bind(Pet, {});
		}

		request((err, pet) => {
			if (err) res.send(err);
			res.json(pet);
		});
	}
}

module.exports = function (router) {
    return new PetsController(router);
};