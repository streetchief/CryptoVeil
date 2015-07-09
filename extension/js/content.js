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
	//THIS IS FORWARDING TO BACKGROUND SCRIPT
	document.addEventListener('toggle-encryption-on', function (e) {
		
		chrome.runtime.sendMessage(extension_id, {message: e.type})
	});

	document.addEventListener('toggle-encryption-off', function (e) {
		
		chrome.runtime.sendMessage(extension_id, {message: e.type})
	});


	//THIS IS FORWARDING TO EXTERNAL SCRIPTS
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		
		console.log('listener message: ', message);

		if (message.command === 'process-logout') {
			document.dispatchEvent(new Event(message.command));
		}

		if (message.command === 'process-login') {
			document.dispatchEvent(new CustomEvent(message.command, {detail: message.payload}))
		}

		if (message.command === 'update-state') {
			document.dispatchEvent(new CustomEvent('update-decryption-state', {detail: message.payload}));
			document.dispatchEvent(new CustomEvent('update-encryption-state', {detail: message.payload}));
		}

		if (message.command === 'set-encryption-circle') {
			document.dispatchEvent(new CustomEvent(message.command, {detail: message.payload}))
		}

		if (message.command === 'toggle-encryption') {
			document.dispatchEvent(new Event(message.command));
		}
	});
});

