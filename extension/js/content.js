///////////////////		GMAIL.JS	///////////////////
var j = document.createElement('script');
j.src = chrome.extension.getURL('/js/jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('/js/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/externalMain.js');
(document.head || document.documentElement).appendChild(s);

var e = document.createElement('script');
e.src = chrome.extension.getURL('/js/dependencies/aes.js');
(document.head || document.documentElement).appendChild(e);

// var l = document.createElement('script');
// l.src = chrome.extension.getURL('/js/dependencies/lodash.js');
// (document.head || document.documentElement).appendChild(l);

///////////////////		EXTENSION CODE	///////////////////

$(document).ready(function(){

	var extension_id = chrome.runtime.id
	
	// document.addEventListener('messageFromExternal', function(e) {
	// 	console.log('from ext', e);
	// });
	// chrome.runtime.sendMessage(extension_id, {message: 'from content script'})
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		console.log('listener message: ', message)
		if (message.command === 'set-decryption-circles') {
			document.dispatchEvent(new CustomEvent(message.command, {detail: message.payload}))
		}

		if (message.command === 'set-encryption-circle') {
			document.dispatchEvent(new CustomEvent(message.command, {detail: message.payload}))
		}

		if (message.command === 'toggle-encryption') {
			document.dispatchEvent(new Event(message.command));
		}
	});
});

// function sendToExternalScript (data) {
// 	document.dispatchEvent(new CustomEvent('messageFromExtension', { detail: data }));
// }

