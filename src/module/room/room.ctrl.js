var BaseController = require("../common/BaseController");
var Room = require("./room.ent");

class RoomController extends BaseController {

	constructor(router) {
		super(router, Room);

		this.bind('/room')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/room/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}
}

module.exports = (router) => new RoomController(router);;