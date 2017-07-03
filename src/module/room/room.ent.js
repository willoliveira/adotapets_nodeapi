'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GROUP_TYPE = [
	"single", 
	"group"
]

var RoomSchema = new Schema({
	participants: {
		type: [ Schema.Types.ObjectId ],
		required: true,
		validate: [
			val => val.length > 1, 
			"No minimo são dois participantes"
		]
	},
	type: {
		type: String,
		enum: GROUP_TYPE,
		default: "single"
	}
}, {
	collection: "room"
});

module.exports = mongoose.model('Room', RoomSchema);