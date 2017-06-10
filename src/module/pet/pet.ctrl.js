var BaseController = require("../common/BaseController");
var Pet = require("./pet.ent");

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

}

module.exports = (router) => new PetsController(router);