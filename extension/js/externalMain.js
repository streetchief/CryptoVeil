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
  var unhacked;

	gmail2.observe.on("view_thread", function (thread) {});

	gmail2.observe.on("view_email", function (email) {
	
		var email = new gmail2.dom.email(email.id)
		var body = email.body();

		//ELIMINATING POSSIBLE TAGS INSERTED BY CHROME
		tagsRegEx = /<{1}.+?>{1}/g
		body = body.replace(tagsRegEx, "");


		if(body.indexOf(sentinel) > -1) {
			var encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength)
			console.log('the encryptedMsg: ', encryptedMsg);
			// sendToContentScript(body);
			unhacked = unhacking(encryptedMsg);
		} 
		//THIS IS FOR VISUAL FEEDBACK THAT IT'S WORKING
		email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
	})
};

		function unhacking(text) {
		    console.log('hit unhacking', text)
		    // var encryptedText = text.slice(15,-6);
		    var decrypted = CryptoJS.AES.decrypt(text, "Secret Passphrase");
		    var temp = decrypted.toString(CryptoJS.enc.Utf8);
		    console.log('this is the decrypted message', temp)
		    return temp;
		}



///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {
	gmail1 = new Gmail();
	  console.log('Hello from encryptedMain,', gmail1.get.user_email());

	function hacking(text) {
		var temp="";

		encrypted = CryptoJS.AES.encrypt(text, "Secret Passphrase");
		
		console.log('this is the encrypted message', encrypted.toString());
		
		temp = '<div dir="ltr"> %%%%' + encrypted + '%%%% </div>'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJleHRlcm5hbE1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ21haWwxO1xudmFyIGdtYWlsMjtcblxuZnVuY3Rpb24gcmVmcmVzaChmKSB7XG4gIGlmKCAoL2luLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSB8fCAodW5kZWZpbmVkID09PSBHbWFpbCkgKSB7XG4gICAgc2V0VGltZW91dCgncmVmcmVzaCgnICsgZiArICcpJywgMSk7XG4gIH0gZWxzZSB7XG4gICAgZigpO1xuICB9XG59IiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdERFQ1JZUFRJT05cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgZGVjcnlwdGVkTWFpbiA9IGZ1bmN0aW9uICgpIHtcblx0Z21haWwyID0gbmV3IEdtYWlsKCk7XG5cdGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGRlY3J5cHRlZE1haW4sJywgZ21haWwyLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdHZhciByZWdFeCA9IC8lJSUlKC4rKSUlJSUvZ21pXG4gIHZhciBzZW50aW5lbCA9ICclJSUlJztcbiAgdmFyIHNlbnRpbmVsTGVuZ3RoID0gc2VudGluZWwubGVuZ3RoO1xuICB2YXIgdW5oYWNrZWQ7XG5cblx0Z21haWwyLm9ic2VydmUub24oXCJ2aWV3X3RocmVhZFwiLCBmdW5jdGlvbiAodGhyZWFkKSB7fSk7XG5cblx0Z21haWwyLm9ic2VydmUub24oXCJ2aWV3X2VtYWlsXCIsIGZ1bmN0aW9uIChlbWFpbCkge1xuXHRcblx0XHR2YXIgZW1haWwgPSBuZXcgZ21haWwyLmRvbS5lbWFpbChlbWFpbC5pZClcblx0XHR2YXIgYm9keSA9IGVtYWlsLmJvZHkoKTtcblxuXHRcdC8vRUxJTUlOQVRJTkcgUE9TU0lCTEUgVEFHUyBJTlNFUlRFRCBCWSBDSFJPTUVcblx0XHR0YWdzUmVnRXggPSAvPHsxfS4rPz57MX0vZ1xuXHRcdGJvZHkgPSBib2R5LnJlcGxhY2UodGFnc1JlZ0V4LCBcIlwiKTtcblxuXG5cdFx0aWYoYm9keS5pbmRleE9mKHNlbnRpbmVsKSA+IC0xKSB7XG5cdFx0XHR2YXIgZW5jcnlwdGVkTXNnID0gYm9keS5tYXRjaChyZWdFeClbMF0uc2xpY2Uoc2VudGluZWxMZW5ndGgsIC1zZW50aW5lbExlbmd0aClcblx0XHRcdGNvbnNvbGUubG9nKCd0aGUgZW5jcnlwdGVkTXNnOiAnLCBlbmNyeXB0ZWRNc2cpO1xuXHRcdFx0Ly8gc2VuZFRvQ29udGVudFNjcmlwdChib2R5KTtcblx0XHRcdHVuaGFja2VkID0gdW5oYWNraW5nKGVuY3J5cHRlZE1zZyk7XG5cdFx0fSBcblx0XHQvL1RISVMgSVMgRk9SIFZJU1VBTCBGRUVEQkFDSyBUSEFUIElUJ1MgV09SS0lOR1xuXHRcdGVtYWlsLmJvZHkodW5oYWNrZWQgKyAnPGg1PkRlY3J5cHRlZCBieSBDcnlwdG9WZWlsPC9oNT4nKVxuXHR9KVxufTtcblxuXHRcdGZ1bmN0aW9uIHVuaGFja2luZyh0ZXh0KSB7XG5cdFx0ICAgIGNvbnNvbGUubG9nKCdoaXQgdW5oYWNraW5nJywgdGV4dClcblx0XHQgICAgLy8gdmFyIGVuY3J5cHRlZFRleHQgPSB0ZXh0LnNsaWNlKDE1LC02KTtcblx0XHQgICAgdmFyIGRlY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KHRleHQsIFwiU2VjcmV0IFBhc3NwaHJhc2VcIik7XG5cdFx0ICAgIHZhciB0ZW1wID0gZGVjcnlwdGVkLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0XHQgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGRlY3J5cHRlZCBtZXNzYWdlJywgdGVtcClcblx0XHQgICAgcmV0dXJuIHRlbXA7XG5cdFx0fVxuXG5cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0RU5DUllQVElPTlx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBlbmNyeXB0ZWRNYWluID0gZnVuY3Rpb24gKCkge1xuXHRnbWFpbDEgPSBuZXcgR21haWwoKTtcblx0ICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBlbmNyeXB0ZWRNYWluLCcsIGdtYWlsMS5nZXQudXNlcl9lbWFpbCgpKTtcblxuXHRmdW5jdGlvbiBoYWNraW5nKHRleHQpIHtcblx0XHR2YXIgdGVtcD1cIlwiO1xuXG5cdFx0ZW5jcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQodGV4dCwgXCJTZWNyZXQgUGFzc3BocmFzZVwiKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZW5jcnlwdGVkIG1lc3NhZ2UnLCBlbmNyeXB0ZWQudG9TdHJpbmcoKSk7XG5cdFx0XG5cdFx0dGVtcCA9ICc8ZGl2IGRpcj1cImx0clwiPiAlJSUlJyArIGVuY3J5cHRlZCArICclJSUlIDwvZGl2Pidcblx0XHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyBoYWNraW5nIGZ1bmMgdGVtcCcsIHRlbXApO1xuXHRcdHJldHVybiB0ZW1wO1xuXHR9XG5cblx0Z21haWwxLm9ic2VydmUuYmVmb3JlKCdzZW5kX21lc3NhZ2UnLCBmdW5jdGlvbih1cmwsIGJvZHksIGRhdGEsIHhocil7XG5cdFx0dmFyIGJvZHlfcGFyYW1zID0geGhyLnhoclBhcmFtcy5ib2R5X3BhcmFtcztcblxuXHRcdC8vIGJvZHlfcGFyYW1zLmJvZHkgPSBoYWNraW5nKGJvZHlfcGFyYW1zLmJvZHkpO1xuXHRcdGJvZHlfcGFyYW1zLmJvZHkgPSBoYWNraW5nKGJvZHlfcGFyYW1zLmJvZHkpO1xuXG5cdFx0Y29uc29sZS5sb2coJ3RoaXMgaXMgYm9keSBwYXJhbXMuYm9keScsIGJvZHlfcGFyYW1zLmJvZHkpO1xuXHR9KVxufTtcblxuLy8gdmFyIGRlY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGVuY3J5cHRlZCwgXCJTZWNyZXQgUGFzc3BocmFzZVwiKTtcbi8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBkZWNyeXB0ZWQgbWVzc2FnZScsIGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkpXG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpc2VuZCcsIHtcblx0Ly8gXHRkZXRhaWw6Ym9keV9wYXJhbXMuYm9keVxuXHQvLyB9KSk7XG5cbi8vIGdtYWlsMS5vYnNlcnZlLm9uKCdvcGVuX2VtYWlsJywgZnVuY3Rpb24ob2JqKSB7XG4vLyBcdC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIG9iaiBmcm9tIG9wZW5fZW1haWwnLCBvYmopXG4vLyBcdFx0dmFyIGVtYWlsID0gbmV3IGdtYWlsMS5kb20uZW1haWwob2JqKVxuLy8gXHRcdC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBlbWFpbCcsIGVtYWlsKTtcbi8vIFx0XHR2YXIgYm9keSA9IGVtYWlsLmJvZHkoKTtcbi8vIFx0XHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgYm9keScsIGJvZHkpO1xuLy8gXHRcdHZhciByZXN1bHQgPSBoYWNraW5nKGJvZHkpO1xuLy8gXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSByZXN1bHQnLCByZXN1bHQpXG4vLyB9KVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0TUVTU0FHSU5HXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZUZyb21FeHRlbnNpb24nLCBmdW5jdGlvbihlKSB7XG59KTtcblxuZnVuY3Rpb24gc2VuZFRvQ29udGVudFNjcmlwdCAoZGF0YSkge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbWVzc2FnZUZyb21FeHRlcm5hbCcsIHsgZGV0YWlsOiBkYXRhIH0pKTtcbn1cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdFJFRlJFU0hFU1x0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnJlZnJlc2goZGVjcnlwdGVkTWFpbik7XG5yZWZyZXNoKGVuY3J5cHRlZE1haW4pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9