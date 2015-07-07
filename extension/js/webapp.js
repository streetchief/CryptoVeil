$(document).ready(function(){

	var server = 'http://127.0.0.1:1337'

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	    console.log('this is listening to the backgroundFactory')
	    // window.location.href = server;
	});

});