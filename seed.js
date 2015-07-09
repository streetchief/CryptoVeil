/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Circle = mongoose.model('Circle');

var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var seedUsers = function () {

    var users = [
        {
            nickname: 'Tester',
            email: 'testing@fsa.com',
            password: 'password',
            myCircles: []
        },
        {
            nickname: 'Obama',
            email: 'obama@gmail.com',
            password: 'potus',
            myCircles: []
        }
    ];

    return q.invoke(User, 'create', users);

};

var getCurrentCircleData = function () {
    return q.ninvoke(Circle, 'find', {});
};

var seedCircles = function (creator) {

    var circles = [
        {
            name: 'SuperDopeHotness',
            creator: creator,
            members: [],
            key: '1234'

        },
        {
            name: 'PartyTime',
            key: '4321'
        }
    ];

    return q.invoke(Circle, 'create', circles);

};

var users;

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        console.log('Entered user seeding!');
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            // process.kill(0);
            return;
        }
    }).then(function (dbUsers) {
        console.log('Entered circle seeding!');
        users = dbUsers;
        return getCurrentCircleData().then(function (circles) {
            
            if (circles.length === 0) {
                console.log('Seeding circles...');
                var temp = dbUsers[0]._id
                return seedCircles(temp);
            } else {
                console.log(chalk.magenta('Seems to have existing circles!'));
                process.kill(0);
            }
        })
    }).then(function (circles) {

        users[0].myCircles.push(circles[0]._id);
        return users[0].save();

    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});