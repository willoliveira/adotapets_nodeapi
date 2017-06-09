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
	"other"
]

const GENRE = [
	"male",
	"female"
]

var PetsSchema = new Schema({
	about: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	ageMonths: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	kind: {
		type: [{
			type: String,
			enum: KIND
		}]
	},
	ageYears: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	breed: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	genre: {
		type: [{
			type: String,
			enum: GENRE
		}],
		Required: 'Kindly enter the name of the task'
	},
	name: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	pictures: {
		type: String,
		Required: 'Kindly enter the name of the task'
	},
	size: {
		type: [{
			type: String,
			enum: SIZE
		}],
		Required: 'Kindly enter the name of the task'
	},
	userId: {
		type: String,
		Required: 'Kindly enter the name of the task'
	}
});

module.exports = mongoose.model('Pets', PetsSchema);