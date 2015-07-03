'use strict';
var user;
var server = 'http://localhost:1337'

function login (userInfo) {
	// console.log('In background.js');
	// console.log(userInfo);
 //    var xhr = new XMLHttpRequest();
 //    xhr.open("POST", server + '/login', true);
 //    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
 //    xhr.send(userInfo);
}

function tabGetter () {
    chrome.tabs.getSelected(null, function(tab) {
      console.log('the tab argument: ', tab);
    });
}

function reqBodyIntercept() {
    console.log('listening...');
}

function runScan () {
    chrome.tabs.getSelected(null, function(tab) {

        chrome.tabs.sendMessage(tab.id, {message: 'hello'})
    })
}




// chrome.runtime.onMessage.addListener(function (message, sender) {
// 	console.log('the message from background: ', message);
// });
