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

//CHECKS IF PASSWORD IS CORRECT  
router.post('/checkPassword', isAuthenticatedUser, function (req, res, next) {
	
	User.findOne({email: req.user.email})
	.exec()
	.then(function (foundUser) {
		console.log('this is req.body.password', req.body.password)
		var result = foundUser.correctPassword(req.body.password);
		console.log('this is result', result)
		if(!result) res.send('password does not match');
		else {
			res.send('password matches')
		}
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

//RESET USER PASSWORD
router.put('/reset', isAuthenticatedUser, function (req, res, next) {

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

//CHANGE USER NICKNAME
router.put('/nickname', isAuthenticatedUser, function (req, res, next) {

	var newNickname = req.body.nickname;
	var userId = req.user._id;

	User.findById(userId)
	.exec()
	.then(function (foundUser) {
		foundUser.nickname = newNickname;
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
		// check if user is creator of any circles, then transfer ownership
		// check if user is member of any circles, then leave the circles (and delete that user from all the circles)
});
