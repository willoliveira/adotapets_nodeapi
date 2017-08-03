var BaseController = require("../common/BaseController");
var Message = require("./message.ent");
var Room = require("../room/room.ent");

class MessageController extends BaseController {

	constructor(router) {
		super(router, Message);

		this.bind('/message')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/message/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
	}

	getMessagesByDate(req, res) {
		this.entity
			.find({createDate: { $lt: req.query.date } })
			.limit(req.query.size)
			.sort("-createDate")
			.exec((err, messages) => {
				if (err) {
					res.status(500).send(err);
				}
				if (messages && messages.length) {
					res.status(200).send({ 
						content : messages
					});
				} else {
					res.status(204).send();
				}
			});
	}

	/**
	 * TODO: deixar assim por enquanto
	 * Antes de salvar a Message, verifica se o user existe
	 * @override 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var petData = req.body;
		Room.findOne({ "_id" : req.body._roomId}, (err, room) => {
			if(err) {
				res.send({
					message: new Error("Error find a room to vinculate in message").message
				});
			}
			if (room) {
				var newMessage = new this.entity(req.body);
				newMessage.save((err, message) => {
					if (err) {
						res.status(500).send({
							message: new Error("Error to save message").message
						});
					}
					res.status(201).json({
						content: message
					});
				})
			} else {
				res.status(412).send({
					message: new Error("Room not exist!").message
				});
			}
		});
	}
}

module.exports = (router) => new MessageController(router);;