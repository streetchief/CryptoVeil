$(document).ready(function(){

	var server = 'http://127.0.0.1:1337'

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	    console.log('this is listening to BackgroundFactory', request);

	    //ASK TOMORROW for refreshing the webapp page on when logged in from chrome extension
	    window.location.href = server;
	    
	    // chrome.tabs.query({title: 'CryptoVeil'}, function (tabs) {
	    //	tabs.forEach(function (tab) {
	    	//	chrome.tabs.reload(tab.id); 
	    // })
	    // })

			// chrome.cookies.set({ url: server }, function (cookie) {
			//     console.log('this is the cookie set', cookie);
			// })
	});// end onMessage

});