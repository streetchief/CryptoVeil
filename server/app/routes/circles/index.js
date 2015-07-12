var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Circle = mongoose.model('Circle');
var User = mongoose.model('User');
var crypto = require('crypto');

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

	crypto.randomBytes(175, function (ex, buf) {
		
		var keyString;

		if (ex) {
			console.log('exception generating key', ex);
			return next(ex);
		}
	  
		keyString = buf.toString('base64');

		console.log('keystring', keyString);

	    var circleToCreate = {
	        name: req.body.circleName.trim(),
	        creator: req.user._id,
	        members: [],
	        key: keyString
	    };

		Circle
		.create(circleToCreate)
		.then(function (circle){
			
			User.findById(userId)
			.then(function (user){
				return user.myCircles.unshift(circle._id);
			})
			.then(function (user){
				user.save();
				return user;
			});

			res.json(circle);
		})
		.then(null, next);
	});
});

// ADD OR REMOVE USER FROM A CIRCLE
router.put('/:circleId', isAuthenticatedUser, function (req, res, next) {
	var circleId = req.params.circleId;
	var emailToEdit = req.body.newEmail;
	var editMode = req.body.edit;
	var updatedCircle;
	var userFound;
	var circleFound;
	
	User.findOne({email: emailToEdit})
	.exec()
	.then(function (foundUser) {

		userFound = foundUser;

		return Circle.findById(circleId)
			.then(function (circle){

				if(editMode.toString() === 'delete') {
					circle.members.pull(foundUser._id)
					return circle;

				} else {
					circle.members.push(foundUser._id)
					return circle;
				}
			})
			.then(function (circle){
				circleFound = circle
				return circle.save();
			});
	})
	.then(function (circleReturned) {

		if(editMode.toString() === 'delete') {
			userFound.myCircles.pull(circleFound._id);
			return userFound;			
		} else {
			userFound.myCircles.push(circleFound._id);
			return userFound;
		}
	})
	.then(function (userFound){
		userFound.save();
		res.send(userFound);
	})
	.then(null, next);
});

//PROMOTE USER TO CREATOR/OWNER OF CIRCLE
router.put('/promote/:userId', isAuthenticatedUser, function (req, res, next) {
	// Circle.
})

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

				return User.findById(req.user._id)
				.then(function(user){
					return user.myCircles.splice(user.myCircles.indexOf(circle._id), 1);
				})

			})
			.then(function (user){
				user.save();
				res.sendStatus(204);
			});
		}
	})
	.then(null, next);
});
