'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    myCircles: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Circle'}
    ],
    nickname: {
        type: String
    },
    picUrl:{
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String,
        token: String,
        name: String,
        email: String
    }
});

//verify no one is using the email to register
var checkEmailIsUnique = function (emailToCheck) {

    return this.model('User').findOne({email: emailToCheck})
        .exec()
        .then(function (user) {
            return !!user;
        }, function (error) {
            throw new Error('Email not valid.');
        });
};

schema.statics.checkEmailIsUnique = checkEmailIsUnique;

/* // TO DO /////////
schema.method('resetPassword', function (nameForCircle) {

});
*/

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.plugin(deepPopulate, {
    populate: {
        'myCircles.creator':{
            select: 'email nickname'
        },
        'myCircles.members':{
            select: 'email nickname'
        }   
    }
})

mongoose.model('User', schema);
