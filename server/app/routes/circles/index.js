var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Circle = mongoose.model('Circle');
var User = mongoose.model('User');

module.exports = router;

function isAuthenticatedUser (req, res, next) {

	if (req.isAuthenticated()) {

		next();
	} else {

		res.sendStatus(401);
	}
}

// TODO
	// UPDATING OR RESETTING A KEY
router.put('/key', isAuthenticatedUser, function (req, res, next){});

// GET ALL CIRCLES FROM LOGGED IN USER, IMPLEMENTED DURING LOGIN, USE BACKGROUDFACTORY
// router.get('/', isAuthenticatedUser, function (req, res, next) {

// 	var userId = req.user._id;
	
// 	User.findById(userId)
// 	.populate('myCircles')
// 	.exec()
// 	.then(function (user) {

// 		res.send(user.myCircles);
// 	})
// 	.then(null, next);
// });

// CREATE NEW CIRCLE
router.post('/', isAuthenticatedUser, function (req, res, next) {
	console.log('hit post circle router', req.body)
	var userId = req.user._id;
	// var circleToAdd = req.body.circleToAdd;
    var circleToCreate = {
        name: req.body.circleName.trim(),
        creator: req.user._id,
        members: []
    };

	console.log('found user', req.user)
	Circle
	.create(circleToCreate)
	.then(function(circle){
		console.log('circle created', circle)
		req.user.myCircles.push(circle._id);
		return req.user.save()
		.then(function(user){
		console.log('user add circle', user, circle)
			res.json(circle);
		});
	}).then(null, next);

});

// ADD USER TO A CIRCLE
router.post('/user', isAuthenticatedUser, function (req, res, next) {

	var circleToEdit = req.body.circleId;
	var userToAddId = req.body.userId; //MUST BE USER ID SENT FROM FRONT END
	
	Circle.findById(circleToEdit)
	.then(function (circle) {

		return circle.addMember(userToAddId);
	})
	.then(function (savedCircle) {

		res.json(savedCircle);
	})
	.then(null, next);
});

// REMOVE USER FROM A CIRCLE
router.put('/user', isAuthenticatedUser, function (req, res, next) {
	
	var circleToEdit = req.body.circleId;
	var userToRemoveId = req.body.userId; //MUST BE USER ID SENT FROM FRONT END
	
	Circle.findById(circleToEdit)
	.then(function (circle) {

		return circle.removeMember(userToRemoveId);
	})
	.then(function (savedCircle) {

		res.json(savedCircle);
	})
	.then(null, next);
});

// DELETE A CIRCLE
router.delete('/:circleId', isAuthenticatedUser, function (req, res, next) {
	var circleId = req.params.circleId;	
	Circle.findById(circleId)
	.populate('creator members')
	.exec()
	.then(function (circle) {
		if (circle.creator._id.toString() !== req.user._id.toString()) {
			res.sendStatus(403)
		} else {
			var promiseArr = [];
			circle.members.forEach(function (member) {
				member.myCircles.pull(circle._id);
				promiseArr.push(member.save());
			});
			return Promise.all(promiseArr)
			.then(function (savedMembers) {
				return Circle.findByIdAndRemove(circle._id).exec();
			})
			.then(function (deletedCircle) {
				res.sendStatus(204);
			})
		}
	})
	.then(null, next)
});
