///////////////////		GMAIL.JS	///////////////////
var j = document.createElement('script');
j.src = chrome.extension.getURL('/js/jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('/js/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/main2.js');
(document.head || document.documentElement).appendChild(s);

var e = document.createElement('script');
e.src = chrome.extension.getURL('/js/dependencies/aes.js');
(document.head || document.documentElement).appendChild(e);

///////////////////		EXTENSION CODE	///////////////////

// chrome.webRequest.onCompleted.addListener(function (response) {
// 	console.log(response);
// })

$(document).ready(function(){

// 	var extension_id = chrome.runtime.id

// document.addEventListener('isend', function(e){
// 	console.log('this is content body_params.body', e.detail);
// })
	
// 	// setInterval(function(){
// 	// 	chrome.runtime.sendMessage(extension_id, {message: 'from content script'})
// 	// }, 1000);

})

// chrome.runtime.onMessage.addListener(function (message, sender) {
// 	console.log('the message: ', message);
// })
