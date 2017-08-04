'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	message: {
		type: String,
		required: true,
	},
	createDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	_userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	_roomId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Room"
	}
}, {
	collection: "messages"
});

module.exports = mongoose.model('Message', MessageSchema);