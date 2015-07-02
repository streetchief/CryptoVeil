'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

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

function isValidName (nameToCheck) {
    return (nameToCheck.search(/[^a-zA-Z0-9]{1}/gim) !== -1);
}

function cleanseName (name) {
    return name = name.trim().replace(/[^a-zA-Z0-9]{1}/gmi, '');
}

schema.method('addNewCircle', function (nameForCircle) {

    var cleansedName, _this = this;

    if (!isValidName(nameForCircle)) throw new Error('Not a valid name.');

    cleansedName = cleanseName(nameForCircle);

    //check to see if user has already made a circle with nameForCircle
    return this.Model('Circle').findOne({creator: this._id, name: cleansedName})
        .then(function (duplicateCircle) {

            if (duplicateCircle) throw new Error('Circle name already in use.');

            var circleToCreate = {
                    name: cleansedName,
                    creator: _this,
                    members: [_this]
                };

            return this.Model('Circle').create(circleToCreate);

        })
        .then(null, function (error) {
            throw new Error(error.message);
        });
});

schema.method('deleteCircle', function (circleIdToDelete) {

    var idFound = this.myCircles.indexOf(circleIdToDelete);

    if (idFound === -1) throw new Error('Circle does not exist.');
    
    return this.Model('Circle').findById(idFound).exec()
        .then(function (circleToDelete) {

            //TODO -- delete circle i.e. 

        }, function (err) {
            throw new Error(err.message);
        })
    
});

/* // TO DO /////////
schema.method('addUserToCircle', function (nameForCircle) {

});

schema.method('removeUserFromCircle', function (nameForCircle) {
    
});

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

mongoose.model('User', schema);