'use strict';
var user = new User();

var server = 'http://127.0.0.1:1337'

function User (userInfo) {
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
    
    this.setLogOutUser = function () {
        myCircles = [];
        email = '';
        nickname = '';
        picUrl = '';
        selectedCircle = {
            _id: "",
            name: "",
            creator: "",
            members: [],
            key: ""
        };
    };

    this.setLoggedInUser = function (user) {

        myCircles = user.myCircles;
        email = user.email;
        nickname = user.nickname;
        picUrl = user.picUrl;

        sendUserCircles(user.myCircles);
    };

    this.getLoggedInUser = function () {
        return {
            myCircles: myCircles,
            email: email,
            nickname: nickname,
            picUrl: picUrl
        };
    };
    
    this.setSelectedCircle = function (circle) {

            selectedCircle._id = circle._id;
            selectedCircle.name = circle.name;
            selectedCircle.creator = circle.creator;
            selectedCircle.members = circle.members;
            selectedCircle.key = circle.key;

            sendSelectedCircle(selectedCircle);        
    };

    this.getSelectedCircle = function () {
        // return {
        //     _id: selectedCircle._id,
        //     name: selectedCircle.name,
        //     creator: selectedCircle.creator,
        //     members: selectedCircle.members,
        //     key: selectedCircle.key
        // };
        return selectedCircle;
    };

    this.getSelectedCircleKey = function () {
        return selectedCircle.key;
    };

    this.isLoggedIn = function () {
        return !!email;
    };
}; //END OF USER

// function tabGetter () {
//     chrome.tabs.getSelected(null, function(tab) {
//       console.log('the tab argument: ', tab);
//     });
// }

function sendToContentScript (command, payload) {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {command: command, payload: payload})
    });
}

function sendSelectedCircle (circle) {
    sendToContentScript('set-encryption-circle', circle);
}

function sendUserCircles (userCircles) {
    sendToContentScript('set-decryption-circles', userCircles);
}

function encryptionToggle () {
    sendToContentScript('toggle-encryption');
}

// chrome.runtime.onMessage.addListener(function (message, sender) {
// 	console.log('the message from background: ', message);
// });
