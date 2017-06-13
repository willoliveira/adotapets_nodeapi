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
	loc: {
		type: { type: String },
		coordinates: [{ type: Number }]		
	},
	picture: {
		type: String,
		Required: "User's picture months is required"
	},
	pets: {
		type: [{ type: String }]
	}
}, {
	collection: "users"
});

UserSchema.index({ "loc": "2dsphere" });

module.exports = mongoose.model('User', UserSchema);