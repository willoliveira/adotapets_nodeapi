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

		this.bind('/room/user/:userId')
			.get(this.getByUser.bind(this));
		
		this.bind('/room/user/:userId/participant/:participantId')
			.get(this.getByUser.bind(this));
	}

	getByUser(req, res) {
		let querry = { participants: "" };
		let arrayUsers = [req.params.userId]

		if (req.params.participantId) {
			arrayUsers.push(req.params.participantId);
			querry.participants = { $all: arrayUsers };
		} else {
			querry.participants = { $in: arrayUsers };
		}
		console.log(querry)
		this.entity
			.find(querry)
			.exec((err, rooms) => {
				if (err) {
					res.status(500).send(err);
				}
				res.status(200).json({
					content:  rooms
				});
			});
	}
}

module.exports = (router) => new RoomController(router);;