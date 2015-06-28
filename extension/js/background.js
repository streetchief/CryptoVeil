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