'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	message: {
		type: String,
		required: true,
	},
	createDate: {
		type: String,
		required: true,
		default: Date.now()
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