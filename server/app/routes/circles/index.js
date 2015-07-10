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

// CREATE NEW CIRCLE
router.post('/', isAuthenticatedUser, function (req, res, next) {
	var userId = req.user._id;
	// var circleToAdd = req.body.circleToAdd;
    var circleToCreate = {
        name: req.body.circleName.trim(),
        creator: req.user._id,
        members: []
    };

	Circle
	.create(circleToCreate)
	.then(function(circle){
		// console.log('circle created', circle);
		User.findById(userId)
		.then(function(user){
			return user.myCircles.unshift(circle._id);
		})
		.then(function(user){
			return user.save;
		})
		return circle;
	})
	.then(function(circle){
		// console.log('user add circle', req.user, circle);
		res.json(circle);
	})
	.then(null, next);
});

// ADD USER TO A CIRCLE
// router.post('/user', isAuthenticatedUser, function (req, res, next) {

// 	var circleToEdit = req.body.circleId;
// 	var userToAddId = req.body.userId; //MUST BE USER ID SENT FROM FRONT END
	
// 	Circle.findById(circleToEdit)
// 	.then(function (circle) {

// 		return circle.addMember(userToAddId);
// 	})
// 	.then(function (savedCircle) {

// 		res.json(savedCircle);
// 	})
// 	.then(null, next);
// });

// ADD OR REMOVE USER FROM A CIRCLE
router.put('/:circleId', isAuthenticatedUser, function (req, res, next) {
	var circleId = req.params.circleId;
	var emailToEdit = req.body.newEmail;
	var editMode = req.body.edit;
	var updatedCircle;
	var userFound
	var circleFound

	// Promise.all([User.findOne({email: emailToEdit})
	// .exec(), Circle.findById(circleId).exec()])
	// .spread(function (user, circle) {})
	
	User.findOne({email: emailToEdit})
	.exec()
	.then(function (foundUser) {
		console.log('this is foundUser', foundUser)
		userFound = foundUser
		return Circle.findById(circleId)
			.then(function(circle){
				console.log('found circle', circle, foundUser)
				if(editMode.toString() === 'delete') {
					console.log('hit delete router')
					circle.members.pull(foundUser._id)
					return circle;

				} else {
					circle.members.push(foundUser._id)
					console.log('hit add router', circle.members, foundUser._id)
					return circle;
				}
			})
			.then(function(circle){
				console.log('hit circle added member to circle', circle)	
				circleFound = circle
				return circle.save();
			}) 
	})
	.then(function (circleReturned) {
		console.log('this is the userFound', userFound)
		if(editMode.toString() === 'delete') {
			userFound.myCircles.pull(circleFound._id);
			return userFound			
		} else {
			userFound.myCircles.push(circleFound._id);
			console.log('hit user, adding circle to user')
			return userFound
		}
	})
	.then(function(userFound){
		userFound.save();
		console.log('last user', userFound)
		res.send(userFound)
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
			res.sendStatus(403);
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
				console.log('the circle deleted', deletedCircle, req.user);
				return User.findById(req.user._id)
				.then(function(user){
					return user.myCircles.splice(user.myCircles.indexOf(circle._id), 1);
				})

			})
			.then(function(user){
				console.log('the deleted circle user', user, req.user)
				user.save();
				res.sendStatus(204);
			})
		}
	})
	.then(null, next)
});
