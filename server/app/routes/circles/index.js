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
	var userId = req.user._id
	User.findById(userId)
	.populate('myCircles')
	.exec()
	.then(function (user) {
		res.send(user.myCircles)
	}, next)
});

router.post('/', isAuthenticatedUser, function (req, res, next) {
	var userId = req.user._id
	User.findById(userId)
	.exec()
	.then(function (user) {
		return user.addNewCircle(req.body))
	}, next)
	.then(function (newCircle) {
		res.json(newCircle);
	}, next);
});

router.put('/addUser', function (req, res, next) {
	var circleToEdit = req.body.circleId
	var userToAddId = req.body.userToAddId //MUST BE USER ID SENT FROM FRONT END
	Circle.findById(circleToEdit)
	.then(function (circle) {
		circle.addUser(userToAddId, next)
	})
});

router.delete('/', function (req, res, next) {

});