'use strict';
function logInBackground (dataToLog) {
	console.log('In background.js');
	console.log(dataToLog);
}

function tabGetter () {
    chrome.tabs.getSelected(null, function(tab) {
      console.log('the tab argument: ', tab);
    });
}

function reqBodyIntercept() {
	console.log('listening...')
  chrome.webRequest.onBeforeRequest.addListener(function (data) {
      console.log('the data: ', data);
  }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"])
}

// chrome.webRequest.onCompleted.addListener(function (data) {
// 	console.log('response data: ', data);
// }, {urls: ["<all_urls>"]})

function runScan () {
	chrome.tabs.getSelected(null, function(tab) {

		chrome.tabs.sendMessage(tab.id, {message: 'hello'})
	})
}

chrome.runtime.onMessage.addListener(function (message, sender) {
	console.log('the message from background: ', message);
})