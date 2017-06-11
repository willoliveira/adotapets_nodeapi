'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	description: {
		type: String,
		Required: "User's description is required"
	},
	email: {
		type: String,
		Required: "User's email is required"
	},
	name: {
		type: String,
		Required: "User's name is required"
	},
	location: {
		type: {
			lat: String,
			lon: String
		},
		Required: "User's location years is required"
	},
	picture: {
		type: String,
		Required: "User's picture months is required"
	},	
	pets: [{
		type: Schema.Types.ObjectId,
		ref: "Pet"
	}]
}, {
	collection: "users"
});

module.exports = mongoose.model('User', UserSchema);