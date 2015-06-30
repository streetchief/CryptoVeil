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

	var regEx = /%%%%(.+)%%%%/gmi
  var sentinel = '%%%%';
  var sentinelLength = sentinel.length;

	gmail2.observe.on("view_thread", function (thread) {});

	gmail2.observe.on("view_email", function (email) {
	
		var email = new gmail2.dom.email(email.id)
		var body = email.body();

		if(body.indexOf(sentinel) > -1) {
			var encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength)
			console.log('body', encryptedMsg);
			// sendToContentScript(body);
		} 
		//THIS IS FOR VISUAL FEEDBACK THAT IT'S WORKING
		email.body('<h1>%CryptoVeil%</h1>' + body)
	})
};

///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {
	gmail1 = new Gmail();
	  console.log('Hello from encryptedMain,', gmail1.get.user_email());

	function hacking(text) {
		var temp="";

		encrypted = CryptoJS.AES.encrypt(text, "Secret Passphrase");
		
		console.log('this is the encrypted message', encrypted.toString());
		
		temp = '<div dir="ltr">' + encrypted + '</div>'
		// console.log('this is hacking func temp', temp);
		return temp;
	}

	gmail1.observe.before('send_message', function(url, body, data, xhr){
		var body_params = xhr.xhrParams.body_params;

		// body_params.body = hacking(body_params.body);
		body_params.body = hacking(body_params.body);

		console.log('this is body params.body', body_params.body);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJleHRlcm5hbE1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ21haWwxO1xudmFyIGdtYWlsMjtcblxuZnVuY3Rpb24gcmVmcmVzaChmKSB7XG4gIGlmKCAoL2luLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSB8fCAodW5kZWZpbmVkID09PSBHbWFpbCkgKSB7XG4gICAgc2V0VGltZW91dCgncmVmcmVzaCgnICsgZiArICcpJywgMSk7XG4gIH0gZWxzZSB7XG4gICAgZigpO1xuICB9XG59IiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdERFQ1JZUFRJT05cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgZGVjcnlwdGVkTWFpbiA9IGZ1bmN0aW9uICgpIHtcblx0Z21haWwyID0gbmV3IEdtYWlsKCk7XG5cdGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGRlY3J5cHRlZE1haW4sJywgZ21haWwyLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdHZhciByZWdFeCA9IC8lJSUlKC4rKSUlJSUvZ21pXG4gIHZhciBzZW50aW5lbCA9ICclJSUlJztcbiAgdmFyIHNlbnRpbmVsTGVuZ3RoID0gc2VudGluZWwubGVuZ3RoO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld190aHJlYWRcIiwgZnVuY3Rpb24gKHRocmVhZCkge30pO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld19lbWFpbFwiLCBmdW5jdGlvbiAoZW1haWwpIHtcblx0XG5cdFx0dmFyIGVtYWlsID0gbmV3IGdtYWlsMi5kb20uZW1haWwoZW1haWwuaWQpXG5cdFx0dmFyIGJvZHkgPSBlbWFpbC5ib2R5KCk7XG5cblx0XHRpZihib2R5LmluZGV4T2Yoc2VudGluZWwpID4gLTEpIHtcblx0XHRcdHZhciBlbmNyeXB0ZWRNc2cgPSBib2R5Lm1hdGNoKHJlZ0V4KVswXS5zbGljZShzZW50aW5lbExlbmd0aCwgLXNlbnRpbmVsTGVuZ3RoKVxuXHRcdFx0Y29uc29sZS5sb2coJ2JvZHknLCBlbmNyeXB0ZWRNc2cpO1xuXHRcdFx0Ly8gc2VuZFRvQ29udGVudFNjcmlwdChib2R5KTtcblx0XHR9IFxuXHRcdC8vVEhJUyBJUyBGT1IgVklTVUFMIEZFRURCQUNLIFRIQVQgSVQnUyBXT1JLSU5HXG5cdFx0ZW1haWwuYm9keSgnPGgxPiVDcnlwdG9WZWlsJTwvaDE+JyArIGJvZHkpXG5cdH0pXG59O1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRFTkNSWVBUSU9OXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGVuY3J5cHRlZE1haW4gPSBmdW5jdGlvbiAoKSB7XG5cdGdtYWlsMSA9IG5ldyBHbWFpbCgpO1xuXHQgIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGVuY3J5cHRlZE1haW4sJywgZ21haWwxLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdGZ1bmN0aW9uIGhhY2tpbmcodGV4dCkge1xuXHRcdHZhciB0ZW1wPVwiXCI7XG5cblx0XHRlbmNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdCh0ZXh0LCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBlbmNyeXB0ZWQgbWVzc2FnZScsIGVuY3J5cHRlZC50b1N0cmluZygpKTtcblx0XHRcblx0XHR0ZW1wID0gJzxkaXYgZGlyPVwibHRyXCI+JyArIGVuY3J5cHRlZCArICc8L2Rpdj4nXG5cdFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgaGFja2luZyBmdW5jIHRlbXAnLCB0ZW1wKTtcblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdGdtYWlsMS5vYnNlcnZlLmJlZm9yZSgnc2VuZF9tZXNzYWdlJywgZnVuY3Rpb24odXJsLCBib2R5LCBkYXRhLCB4aHIpe1xuXHRcdHZhciBib2R5X3BhcmFtcyA9IHhoci54aHJQYXJhbXMuYm9keV9wYXJhbXM7XG5cblx0XHQvLyBib2R5X3BhcmFtcy5ib2R5ID0gaGFja2luZyhib2R5X3BhcmFtcy5ib2R5KTtcblx0XHRib2R5X3BhcmFtcy5ib2R5ID0gaGFja2luZyhib2R5X3BhcmFtcy5ib2R5KTtcblxuXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzIGJvZHkgcGFyYW1zLmJvZHknLCBib2R5X3BhcmFtcy5ib2R5KTtcblx0fSlcbn07XG5cbi8vIHZhciBkZWNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdChlbmNyeXB0ZWQsIFwiU2VjcmV0IFBhc3NwaHJhc2VcIik7XG4vLyBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZGVjcnlwdGVkIG1lc3NhZ2UnLCBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpKVxuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaXNlbmQnLCB7XG5cdC8vIFx0ZGV0YWlsOmJvZHlfcGFyYW1zLmJvZHlcblx0Ly8gfSkpO1xuXG4vLyBnbWFpbDEub2JzZXJ2ZS5vbignb3Blbl9lbWFpbCcsIGZ1bmN0aW9uKG9iaikge1xuLy8gXHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyBvYmogZnJvbSBvcGVuX2VtYWlsJywgb2JqKVxuLy8gXHRcdHZhciBlbWFpbCA9IG5ldyBnbWFpbDEuZG9tLmVtYWlsKG9iailcbi8vIFx0XHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZW1haWwnLCBlbWFpbCk7XG4vLyBcdFx0dmFyIGJvZHkgPSBlbWFpbC5ib2R5KCk7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGJvZHknLCBib2R5KTtcbi8vIFx0XHR2YXIgcmVzdWx0ID0gaGFja2luZyhib2R5KTtcbi8vIFx0XHRjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgcmVzdWx0JywgcmVzdWx0KVxuLy8gfSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdE1FU1NBR0lOR1x0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2VGcm9tRXh0ZW5zaW9uJywgZnVuY3Rpb24oZSkge1xufSk7XG5cbmZ1bmN0aW9uIHNlbmRUb0NvbnRlbnRTY3JpcHQgKGRhdGEpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ21lc3NhZ2VGcm9tRXh0ZXJuYWwnLCB7IGRldGFpbDogZGF0YSB9KSk7XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRSRUZSRVNIRVNcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5yZWZyZXNoKGRlY3J5cHRlZE1haW4pO1xucmVmcmVzaChlbmNyeXB0ZWRNYWluKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==