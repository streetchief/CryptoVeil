'use strict'
var mongoose = require('mongoose');

var circleSchema = new mongoose.Schema({
	name: {type: String},
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	createdOn: {
		type: Date,
		default: Date
	},
	keyExpireOn: {type: Date},
	key: {type: String}
})

var Circle = mongoose.model('Circle', circleSchema);