// chrome.webRequest.onCompleted.addListener(function (response) {
// 	console.log(response);
// })


chrome.runtime.onMessage.addListener(function (message, sender) {
	console.log('the message: ', message);
})