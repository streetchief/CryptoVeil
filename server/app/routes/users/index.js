var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Circle = mongoose.model('Circle');
var User = mongoose.model('User');
var _ = require('lodash');

module.exports = router;

function isAuthenticatedUser (req, res, next) {

	if (req.isAuthenticated()) {

		next();
	} else {

		res.sendStatus(401);
	}
}

//GET USER INFO
router.get('/', isAuthenticatedUser, function (req, res, next) {

	var userId = req.user._id;

	User.findById(userId)
	.populate('myCircles')
	.exec()
	.then(function (foundUser) {
		console.log('his router to get user info using deeppopulate', foundUser)
		res.status(200).send({ 
			user: _.pluck(foundUser.toJSON(),
			['nickname', 'picUrl', 'myCircles', 'email'])
		});
	})
	.then(null, next);
});


//CHECKS BY EMAIL IF THE USER (TO ADD TO THE CIRCLE) IS REGISTERED 
router.get('/:userEmail', isAuthenticatedUser, function (req, res, next) {
	
	User.findOne({email: req.params.userEmail})
	.exec()
	.then(function (foundUser) {
		if(!foundUser) res.send('no user');
		else {
			res.send('ok')
		}
	})
	.then(null, next);
});


//REGISTERING A USER
router.post('/', function (req, res, next) {
	console.log('hit router', req.body)
	var email = req.body.email;

	if (!User.checkEmailIsUnique(email)) return next();

	User.create(req.body)
	// .exec()
	.then(function (createdUser) {
		
		console.log('hit router 2', createdUser);

		req.logIn(createdUser, function (err) {

			if (err) return next(err);
			
			res.status(201).send({ 
				user: _.omit(createdUser.toJSON(), ['password', 'salt'])
			});
		});
	})
	.then(null, next);
});

//UPDATING USER INFO
router.put('/', isAuthenticatedUser, function (req, res, next) {

	var newPass = req.body.password;
	var userId = req.user._id;

	User.findById(userId)
	.exec()
	.then(function (foundUser) {
		foundUser.password = newPass;
		return foundUser.save();
	})
	.then(function (updatedUser) {
		res.sendStatus(204);
	})
	.then(null, next);

});

// TODO -- add functionality
//DELETE YOUR ACCOUNT
router.delete('/', isAuthenticatedUser, function (req, res, next) {

		// Let the circle live (probably)
		// Promote some member (who?) to creator
		// Option to change key/destroy all sent messages
});
