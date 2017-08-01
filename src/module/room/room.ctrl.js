var BaseController = require("../common/BaseController");
var RoomEntity = require("./room.ent");
var UserEntity = require("../user/user.ent.js");
var Message = require("../message/message.ent.js");

class RoomController extends BaseController {

	constructor(router) {
		super(router, RoomEntity);

		this.bind('/room')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/room/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));
		
		this.bind(`/room/:roomId/messages`)
			.get(this.getRoomMessagesByDate.bind(this));

		this.bind('/room/user/:userId')
			.get(this.getByUser.bind(this));
		
		this.bind('/room/user/:userId/participant/:participantId')
			.get(this.getByUserAndParticipant.bind(this));
	}

	get(req, res) {
		if (req.query) {
			this.getRoomMessagesByDate(req, res);
		}
		super.get(req, res);
	}

	/**
	 * req.query { size, date} pagination
	 * @param {*} req 
	 * @param {*} res 
	 */
	getRoomMessagesByDate(req, res) {
		let messageEntity;
		let date = req.query.date || Date.now();
		let dateEqualRemove = req.query.hasOwnProperty("dateEqualRemove") ? "$lt" : "$lte";
		
		messageEntity = Message
			.find({ "createDate": { [`${dateEqualRemove}`]: date } })
			.sort("-createDate");

		if (req.query.size) {
			messageEntity = messageEntity.limit(+req.query.size);
		}

		messageEntity.exec((err, messages) => {
			if (err) {
				res.status(500).send(err);
			}
			if (messages && messages.length) {
				res.status(200).send({ 
					content : {
						"messages": messages
					}
				});
			} else {
				res.status(204).send({ content : "" });
			}
		});
	}

	getByUser(req, res) {
		var querry = { 
			participants:  { 
				$in: [req.params.userId]
			}
		};
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

	getByUserAndParticipant(req, res) {
		var arrayParticipants = [req.params.userId, req.params.participantId];
		var querry = {
			participants:  { 
				$all: arrayParticipants
			}
		};
		this.entity
			.find(querry)
			.exec((err, room) => {
				if (err) {
					res.status(500).send(err);
				}
				//se a sala já existir, devolve ela
				if (room && room.length) {
					res.status(200).json({
						content:  room[0]
					});
				} 
				//se não cria uma sala
				else {
					//Verifica se os usuários da sala existem
					UserEntity
						.find({ _id: { $in: arrayParticipants } })
						.exec((err, users) => {
							var usersInRoom;
							//se existirem, cria a sala
							if (users.length === arrayParticipants.length) {
								//verifica se todos os usuarios que voltou da consulta, realmente são os passados na criacao da sala
								usersInRoom = verifyUsersRoom(arrayParticipants, users);
								if (usersInRoom === arrayParticipants.length) {
									req.body = { "participants": arrayParticipants };
									this.post.call(this, req, res);
								} else {
									res.status(412).send({
										content: {
											error: 412,
											message: new Error("Esta tentando criar uma janela de conversa com um usuario que não existe").message
										}
									});
								}
							} else {
								res.status(412).send({
									content: {
										error: 412,
										message: new Error("Esta tentando criar uma janela de conversa com um usuario que não existe").message
									}
								})
							}
						});
				}
			});
	}
}

function verifyUsersRoom(arrayParticipants, usersQuery) {
	return arrayParticipants.filter(participantId =>  usersQuery.map(user => `${user._id}`).indexOf(participantId) > -1)
}

module.exports = (router) => new RoomController(router);;