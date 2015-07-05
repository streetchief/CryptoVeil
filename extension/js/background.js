'use strict';
var server = 'http://localhost:1337'

// function userHello (email) {
//     var useremail = email;

//     this.setSayHi = function(someEmail) {
//         useremail = someEmail;
//     }

//     this.getSayHi = function() {
//         return 'Hi, my email is ' + useremail;
//     }
// }

var userHello = function (userInfo) {
    var myCircles = [],
    email = "",
    nickname = "",
    picUrl = "",
    selectedCircle = {
        _id: "",
        name: "",
        creator: "",
        members: [],
        key: ""
    };
    

    this.setLoggedInUser = function (user) {
        myCircles = user.myCircles;
        email = user.email;
        nickname = user.nickname;
        picUrl = user.picUrl;
    };

    this.setSelectedCircle = function (circle) {
        selectedCircle._id = circle._id;
        selectedCircle.name = circle.name;
        selectedCircle.creator = circle.creator;
        selectedCircle.members = circle.members;
        selectedCircle.key = circle.key;
    };

    this.getLoggedInUser = function () {
        return {
            myCircles: myCircles,
            email: email,
            nickname: nickname,
            picUrl: picUrl
        };
    };

    this.getSelectedCircle = function () {
        return {
            _id: selectedCircle._id,
            name: selectedCircle.name,
            creator: selectedCircle.creator,
            members: selectedCircle.members,
            key: selectedCircle.key
        };
    };

    this.getSelectedCircleKey = function () {
        return selectedCircle.key;
    };
}; //END OF USER

function tabGetter () {
    chrome.tabs.getSelected(null, function(tab) {
      console.log('the tab argument: ', tab);
    });
}

function sendToContentScript () {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {command: 'toggle-encryption'})
    });
}

function encryptionToggle () {
    sendToContentScript();
}

// function reqBodyIntercept() {
//     console.log('listening...');
// }

// function runScan () {
//     chrome.tabs.getSelected(null, function(tab) {

//         chrome.tabs.sendMessage(tab.id, {message: 'hello'})
//     })
// }




// chrome.runtime.onMessage.addListener(function (message, sender) {
// 	console.log('the message from background: ', message);
// });
