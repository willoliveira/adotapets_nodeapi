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
		Required: "Pet's userId is required"
	},
	name: {
		type: String,
		Required: "Pet's name is required"
	},
	about: {
		type: String,
		Required: "Pet's about is required"
	},
	kind: {
		type: String,
		enum: KIND,
		Required: "Pet's kind is required"
	},
	ageYears: {
		type: Number,
		Required: "Pet's age years is required"
	},
	ageMonths: {
		type: Number,
		Required: "Pet's age months is required"
	},
	breed: {
		type: String,
		Required: "Pet's breed is required"
	},
	genre: {
		type: String,
		enum: GENRE,
		Required: "Pet's genre is required"
	},
	pictures: [{
		position: Number,
		pictureUrl: String
	}],
	size: {
		type: String,
		enum: SIZE,
		Required: "Pet's size is required"
	}
}, {
	collection: "pets"
});

module.exports = mongoose.model('Pet', PetsSchema);