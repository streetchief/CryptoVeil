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

router.get('/', isAuthenticatedUser, function (req, res, next) {

	var userId = req.user._id;
	
	User.findById(userId)
	.populate('myCircles')
	.exec()
	.then(function (user) {
		res.send(user.myCircles)
	})
	.then(null, next);
});

router.post('/', isAuthenticatedUser, function (req, res, next) {

	var userId = req.user._id;
	var circleToAdd = req.body.circleToAdd;
	
	User.findById(userId)
	.exec()
	.then(function (user) {
		return user.addNewCircle(circleToAdd);
	})
	.then(function (newCircle) {
		res.json(newCircle);
	})
	.then(null, next);
});
//put(/removeUser)
router.post('/user', function (req, res, next) {
	
	var circleToEdit = req.body.circleId;
	var userToAddId = req.body.userToAddId; //MUST BE USER ID SENT FROM FRONT END
	
	Circle.findById(circleToEdit)
	.then(function (circle) {
		return circle.addMember(userToAddId);
	})
	.then(function (savedCircle) {
		res.json(savedCircle);
	})
	.then(null, next);
});

router.delete('/', function (req, res, next) {

});
