// chrome.webRequest.onCompleted.addListener(function (response) {
// 	console.log(response);
// })
$(document).ready(function(){

	var extension_id = chrome.runtime.id
	
	setInterval(function(){
		chrome.runtime.sendMessage(extension_id, {message: 'from content script'})
	}, 1000);

})

chrome.runtime.onMessage.addListener(function (message, sender) {
	console.log('the message: ', message);
})
