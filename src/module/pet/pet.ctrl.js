var Pet = require("./pet.ent");

class PetsController {

	constructor(router) {

		router.route('/pet').get(this.getPet);
		router.route('/pet').post(this.postPet);

		router.route('/pet/:id').get(this.getPet);
	}

	postPet(req, res) {
		console.log("post")
		var newPet = new Pet(req.body);
		newPet.save(function(err, task) {
			if (err) res.send(err);
			res.json(task);
		});
	}

	getPet(req, res) {
		// var request;
		// if (req.params.id) request = Pet.findById.bind(this, req.params.taskId);
		// request = Pet.find.bind(this, {});

		// request((err, pet) => {
		// 	if (err) res.send(err);
		// 	res.json(task);
		// });

		Pet.find.bind(this, {}, (err, pet) => {
			if (err) res.send(err);
			res.json(task);
		})
	}
}

module.exports = function (router) {
    return new PetsController(router);
};