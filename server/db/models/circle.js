'use strict';
var Circle;
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
});

//circle.addMember()
circleSchema.method('addMember', function (userId) {

	var _this = this,
		newMember;

	return this.Model('User').findById(userId)
	.then(function (foundUser) {

		newMember = foundUser;
		_this.members.push(foundUser._id);
		return _this.save();
	})
	.then(function (updatedCircle) {

		newMember.myCircles.push(_this._id);

		return newMember.save();
	})
	.then(function () {

		return Circle.findById(_this._id).exec();
	})
	.then(null, function (err) {

		throw new Error(err.message);
	});
});

//circle.removeMember()
circleSchema.method('removeMember', function (userId) {
	
	var _this = this,
		aMember;

	return this.Model('User').findById(userId)
	.then(function (foundUser) {

		aMember = foundUser;
		_this.members.pull(foundUser._id);
		return _this.save();
	})
	.then(function (updatedCircle) {

		aMember.myCircles.pull(_this._id);

		return aMember.save();
	})
	.then(function () {

		return Circle.findById(_this._id).exec();
	})
	.then(null, function (err) {

		throw new Error(err.message);
	});
});

Circle = mongoose.model('Circle', circleSchema);
