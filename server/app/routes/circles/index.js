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
			return next(ex);
		}
	  
		keyString = buf.toString('base64');

	    var circleToCreate = {
	        name: req.body.circleName.trim(),
	        creator: req.user._id,
	        members: [],
	        key: keyString
	    };

		Circle
		.create(circleToCreate)
		.then(function (circle){
			
			return User.findById(userId) //return ok?
			.exec()
			.then(function (user){
				user.myCircles.unshift(circle._id);
				return user;
			})
			.then(function (user){
				user.save();
				return user;
			})
			.then(function (user) {
				
				return Circle.findById(circle._id)
					.populate('creator')
					.exec();
			})
			.then(function (populatedCircle) {
				res.send(populatedCircle);
			})
		})
		.then(null, next);
	});
});

// ADD OR REMOVE USER FROM A CIRCLE
router.put('/:circleId', isAuthenticatedUser, function (req, res, next) {
	var circleId = req.params.circleId,
		emailToEdit = req.body.newEmail,
		editMode = req.body.edit,
		updatedCircle,
		userFound,
		circleFound;
	
	User.findOne({email: emailToEdit})
	.exec()
	.then(function (foundUser) {

		userFound = foundUser;

		return Circle.findById(circleId)
			.exec()
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

				circleFound = circle;
				circle.save();
				return circle;
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
		return userFound;
	})
	.then(function (user) {
		res.send(user);
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
