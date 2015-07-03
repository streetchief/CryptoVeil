var gmail1;
var gmail2;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 1);
  } else {
    f();
  }
}
//////////////////////////	DECRYPTION	///////////////////////////////////
var decryptedMain = function () {
	gmail2 = new Gmail();

	console.log('Hello from decryptedMain,', gmail2.get.user_email());

	var regEx = /%%%%(.+)%%%%/gmi,
		sentinel = '%%%%',
		sentinelLength = sentinel.length,
		unhacked;

	gmail2.observe.on("view_thread", function (thread) {});

	gmail2.observe.on("view_email", function (email) {

		var email, body, encryptedMsg;
	
		email = new gmail2.dom.email(email.id)
		body = email.body();

		//ELIMINATING POSSIBLE TAGS INSERTED BY CHROME
		tagsRegEx = /<{1}.+?>{1}/g
		body = body.replace(tagsRegEx, "");


		if(body.indexOf(sentinel) > -1) {

			encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength)

			// sendToContentScript(body);
			unhacked = unhacking(encryptedMsg);
			email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
		} 
	});
};

function unhacking(text) {

	var decrypted, temp;
    
    decrypted = CryptoJS.AES.decrypt(text, "Secret Passphrase");
    temp = decrypted.toString(CryptoJS.enc.Utf8);

    return temp;
}

///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	  console.log('Hello from encryptedMain,', gmail1.get.user_email());

	function hacking(text) {
		var temp = "";

		encrypted = CryptoJS.AES.encrypt(text, "Secret Passphrase");
		
		temp = '<div dir="ltr"> %%%%' + encrypted + '%%%% </div>'

		return temp;
	}

	gmail1.observe.before('send_message', function(url, body, data, xhr){

		var body_params;

		body_params = xhr.xhrParams.body_params;

		body_params.body = hacking(body_params.body);
	})
};

// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
// console.log('this is the decrypted message', decrypted.toString(CryptoJS.enc.Utf8))
	// document.dispatchEvent(new CustomEvent('isend', {
	// 	detail:body_params.body
	// }));

// gmail1.observe.on('open_email', function(obj) {
// 	// console.log('this is obj from open_email', obj)
// 		var email = new gmail1.dom.email(obj)
// 		// console.log('this is the email', email);
// 		var body = email.body();
// 		// console.log('this is the body', body);
// 		var result = hacking(body);
// 		console.log('this is the result', result)
// })

////////////////////////////	MESSAGING	///////////////////////////////////
document.addEventListener('messageFromExtension', function(e) {
});

function sendToContentScript (data) {
	document.dispatchEvent(new CustomEvent('messageFromExternal', { detail: data }));
}

////////////////////////////	REFRESHES	///////////////////////////////////
refresh(decryptedMain);
refresh(encryptedMain);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImV4dGVybmFsTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbWFpbDE7XG52YXIgZ21haWwyO1xuXG5mdW5jdGlvbiByZWZyZXNoKGYpIHtcbiAgaWYoICgvaW4vLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHx8ICh1bmRlZmluZWQgPT09IEdtYWlsKSApIHtcbiAgICBzZXRUaW1lb3V0KCdyZWZyZXNoKCcgKyBmICsgJyknLCAxKTtcbiAgfSBlbHNlIHtcbiAgICBmKCk7XG4gIH1cbn0iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0REVDUllQVElPTlx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBkZWNyeXB0ZWRNYWluID0gZnVuY3Rpb24gKCkge1xuXHRnbWFpbDIgPSBuZXcgR21haWwoKTtcblxuXHRjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBkZWNyeXB0ZWRNYWluLCcsIGdtYWlsMi5nZXQudXNlcl9lbWFpbCgpKTtcblxuXHR2YXIgcmVnRXggPSAvJSUlJSguKyklJSUlL2dtaSxcblx0XHRzZW50aW5lbCA9ICclJSUlJyxcblx0XHRzZW50aW5lbExlbmd0aCA9IHNlbnRpbmVsLmxlbmd0aCxcblx0XHR1bmhhY2tlZDtcblxuXHRnbWFpbDIub2JzZXJ2ZS5vbihcInZpZXdfdGhyZWFkXCIsIGZ1bmN0aW9uICh0aHJlYWQpIHt9KTtcblxuXHRnbWFpbDIub2JzZXJ2ZS5vbihcInZpZXdfZW1haWxcIiwgZnVuY3Rpb24gKGVtYWlsKSB7XG5cblx0XHR2YXIgZW1haWwsIGJvZHksIGVuY3J5cHRlZE1zZztcblx0XG5cdFx0ZW1haWwgPSBuZXcgZ21haWwyLmRvbS5lbWFpbChlbWFpbC5pZClcblx0XHRib2R5ID0gZW1haWwuYm9keSgpO1xuXG5cdFx0Ly9FTElNSU5BVElORyBQT1NTSUJMRSBUQUdTIElOU0VSVEVEIEJZIENIUk9NRVxuXHRcdHRhZ3NSZWdFeCA9IC88ezF9Lis/PnsxfS9nXG5cdFx0Ym9keSA9IGJvZHkucmVwbGFjZSh0YWdzUmVnRXgsIFwiXCIpO1xuXG5cblx0XHRpZihib2R5LmluZGV4T2Yoc2VudGluZWwpID4gLTEpIHtcblxuXHRcdFx0ZW5jcnlwdGVkTXNnID0gYm9keS5tYXRjaChyZWdFeClbMF0uc2xpY2Uoc2VudGluZWxMZW5ndGgsIC1zZW50aW5lbExlbmd0aClcblxuXHRcdFx0Ly8gc2VuZFRvQ29udGVudFNjcmlwdChib2R5KTtcblx0XHRcdHVuaGFja2VkID0gdW5oYWNraW5nKGVuY3J5cHRlZE1zZyk7XG5cdFx0XHRlbWFpbC5ib2R5KHVuaGFja2VkICsgJzxoNT5EZWNyeXB0ZWQgYnkgQ3J5cHRvVmVpbDwvaDU+Jylcblx0XHR9IFxuXHR9KTtcbn07XG5cbmZ1bmN0aW9uIHVuaGFja2luZyh0ZXh0KSB7XG5cblx0dmFyIGRlY3J5cHRlZCwgdGVtcDtcbiAgICBcbiAgICBkZWNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdCh0ZXh0LCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuICAgIHRlbXAgPSBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXG4gICAgcmV0dXJuIHRlbXA7XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdEVOQ1JZUFRJT05cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgZW5jcnlwdGVkTWFpbiA9IGZ1bmN0aW9uICgpIHtcblxuXHRnbWFpbDEgPSBuZXcgR21haWwoKTtcblx0ICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBlbmNyeXB0ZWRNYWluLCcsIGdtYWlsMS5nZXQudXNlcl9lbWFpbCgpKTtcblxuXHRmdW5jdGlvbiBoYWNraW5nKHRleHQpIHtcblx0XHR2YXIgdGVtcCA9IFwiXCI7XG5cblx0XHRlbmNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdCh0ZXh0LCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuXHRcdFxuXHRcdHRlbXAgPSAnPGRpdiBkaXI9XCJsdHJcIj4gJSUlJScgKyBlbmNyeXB0ZWQgKyAnJSUlJSA8L2Rpdj4nXG5cblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdGdtYWlsMS5vYnNlcnZlLmJlZm9yZSgnc2VuZF9tZXNzYWdlJywgZnVuY3Rpb24odXJsLCBib2R5LCBkYXRhLCB4aHIpe1xuXG5cdFx0dmFyIGJvZHlfcGFyYW1zO1xuXG5cdFx0Ym9keV9wYXJhbXMgPSB4aHIueGhyUGFyYW1zLmJvZHlfcGFyYW1zO1xuXG5cdFx0Ym9keV9wYXJhbXMuYm9keSA9IGhhY2tpbmcoYm9keV9wYXJhbXMuYm9keSk7XG5cdH0pXG59O1xuXG4vLyB2YXIgZGVjcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoZW5jcnlwdGVkLCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGRlY3J5cHRlZCBtZXNzYWdlJywgZGVjcnlwdGVkLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KSlcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2lzZW5kJywge1xuXHQvLyBcdGRldGFpbDpib2R5X3BhcmFtcy5ib2R5XG5cdC8vIH0pKTtcblxuLy8gZ21haWwxLm9ic2VydmUub24oJ29wZW5fZW1haWwnLCBmdW5jdGlvbihvYmopIHtcbi8vIFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgb2JqIGZyb20gb3Blbl9lbWFpbCcsIG9iailcbi8vIFx0XHR2YXIgZW1haWwgPSBuZXcgZ21haWwxLmRvbS5lbWFpbChvYmopXG4vLyBcdFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGVtYWlsJywgZW1haWwpO1xuLy8gXHRcdHZhciBib2R5ID0gZW1haWwuYm9keSgpO1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBib2R5JywgYm9keSk7XG4vLyBcdFx0dmFyIHJlc3VsdCA9IGhhY2tpbmcoYm9keSk7XG4vLyBcdFx0Y29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHJlc3VsdCcsIHJlc3VsdClcbi8vIH0pXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRNRVNTQUdJTkdcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlRnJvbUV4dGVuc2lvbicsIGZ1bmN0aW9uKGUpIHtcbn0pO1xuXG5mdW5jdGlvbiBzZW5kVG9Db250ZW50U2NyaXB0IChkYXRhKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdtZXNzYWdlRnJvbUV4dGVybmFsJywgeyBkZXRhaWw6IGRhdGEgfSkpO1xufVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0UkVGUkVTSEVTXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xucmVmcmVzaChkZWNyeXB0ZWRNYWluKTtcbnJlZnJlc2goZW5jcnlwdGVkTWFpbik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=