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

schema.method('addUser', function (userId, next) {
	var _this = this;
	return this.Model('User').findById(userId).then(function (user) {
		_this.members.push(user._id)
		_this.save(function (err) {
			if (err) return next(err)
			return 'Successfully added user to circle!'
		});
	}, next)
})

var Circle = mongoose.model('Circle', circleSchema);