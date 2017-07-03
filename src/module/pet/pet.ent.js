'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SIZE = [
	"small", 
	"medium",
	"large"
]

const KIND = [
	"dog", 
	"cat",
	"others"
]

const GENRE = [
	"male",
	"female"
]

var PetsSchema = new Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	name: {
		type: String,
		required: true
	},
	about: {
		type: String,
		required: true
	},
	kind: {
		type: String,
		enum: KIND,
		required: true
	},
	ageYears: {
		type: Number,
		required: true
	},
	ageMonths: {
		type: Number,
		required: true
	},
	breed: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		enum: GENRE,
		required: true
	},
	pictures: [{
		position: Number,
		pictureUrl: String
	}],
	size: {
		type: String,
		enum: SIZE,
		required: true
	}
}, {
	collection: "pets"
});

module.exports = mongoose.model('Pet', PetsSchema);