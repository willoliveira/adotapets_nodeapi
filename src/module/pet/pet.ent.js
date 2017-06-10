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
	about: String
});

module.exports = mongoose.model('Pet	', PetsSchema);