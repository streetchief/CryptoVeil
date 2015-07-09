'use strict';
var user = new User();

var encryptionState = new ControlEncryption();

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

        processLogout();
    };

    this.setLoggedInUser = function (user) {

        myCircles = user.myCircles;
        email = user.email;
        nickname = user.nickname;
        picUrl = user.picUrl;

        processLogin(user.myCircles);
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
        return selectedCircle;
    };

    this.getSelectedCircleKey = function () {
        return selectedCircle.key;
    };

    this.isLoggedIn = function () {
        return !!email;
    };
}; //END OF USER


function processLogout () {
    encryptionState.turnOff();
    sendToContentScript('process-logout');
}

function sendSelectedCircle (circle) {
    sendToContentScript('set-encryption-circle', circle);
}

function processLogin (userCircles) {
    sendToContentScript('process-login', userCircles);
}

function ControlEncryption () {

    var toggleState = false; 

    this.toggle = function () {
        toggleState = !toggleState;
    };

    this.turnOff = function () {
        toggleState = false;
    };

    this.turnOn = function () {
        toggleState = true;      
    };

    this.getState = function () {
        return toggleState;
    };
}

function encryptionToggle () {
    encryptionState.toggle();
    sendToContentScript('toggle-encryption');
}

function sendToContentScript (command, payload) {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {command: command, payload: payload})
    });
}

//FOR BLOCKING NON-EMPTY GMAIL EMAILS
// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) { 

//         if (details.requestBody && details.requestBody.body){
//             if (details.requestBody.body[0] !== '<div dir="ltr"></div>') {
//                 console.log('blocking email');
//                 return {cancel: true}; 
//             } else {
//                 return {cancel: false};
//             }
//         }
//     },
//     {urls: ["*://mail.google.com/*"]},
//     ["blocking", "requestBody"]
//   );

// MESSAGES COMING FROM CONTENT SCRIPT, TRIGGERED BY EXTERNAL SCRIPTS
// chrome.runtime.onMessage.addListener(function (message, sender) {

//     if (message === 'toggle-encryption-on') {
//         encryptionState.turnOn();
//     }

//     if (message === 'toggle-encryption-off') {
//         encryptionState.turnOff();
//     }
 
// });

// function tabGetter () {
//     chrome.tabs.getSelected(null, function(tab) {
//       console.log('the tab argument: ', tab);
//     });
// }
