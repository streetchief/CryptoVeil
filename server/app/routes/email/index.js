'use strict';
var router = require('express').Router();
module.exports = router;
var bodyParser = require('body-parser');
var sendEmail = require('./email.js');

router.post('/', function(req, res){
	console.log('hit router', req.body);
	res.status(200);
	// sendEmail()
});