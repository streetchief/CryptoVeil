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

	var encryptionEnabled = false;

	document.addEventListener('message-from-content', function(e) {
		
		if (e.detail === 'toggle-encryption') {
			
			if(!encryptionEnabled) {

				encryptionEnabled = true;
				
				gmail1.observe.before('send_message', function(url, body, data, xhr){
				
					var body_params;
					body_params = xhr.xhrParams.body_params;
					body_params.body = hacking(body_params.body);
				});
			} else {
				
				encryptionEnabled = false;
				gmail1.observe.off('send_message', 'before');
			}
		}
	});

}; //END OF MAIN

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
// document.addEventListener('messageFromExtension', function(e) {
// });

function sendToContentScript (data) {
	document.dispatchEvent(new CustomEvent('messageFromExternal', { detail: data }));
}

////////////////////////////	REFRESHES	///////////////////////////////////
refresh(decryptedMain);
refresh(encryptedMain);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZXh0ZXJuYWxNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdtYWlsMTtcbnZhciBnbWFpbDI7XG5cbmZ1bmN0aW9uIHJlZnJlc2goZikge1xuICBpZiggKC9pbi8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkgfHwgKHVuZGVmaW5lZCA9PT0gR21haWwpICkge1xuICAgIHNldFRpbWVvdXQoJ3JlZnJlc2goJyArIGYgKyAnKScsIDEpO1xuICB9IGVsc2Uge1xuICAgIGYoKTtcbiAgfVxufSIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRERUNSWVBUSU9OXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGRlY3J5cHRlZE1haW4gPSBmdW5jdGlvbiAoKSB7XG5cdGdtYWlsMiA9IG5ldyBHbWFpbCgpO1xuXG5cdGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGRlY3J5cHRlZE1haW4sJywgZ21haWwyLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdHZhciByZWdFeCA9IC8lJSUlKC4rKSUlJSUvZ21pLFxuXHRcdHNlbnRpbmVsID0gJyUlJSUnLFxuXHRcdHNlbnRpbmVsTGVuZ3RoID0gc2VudGluZWwubGVuZ3RoLFxuXHRcdHVuaGFja2VkO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld190aHJlYWRcIiwgZnVuY3Rpb24gKHRocmVhZCkge30pO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld19lbWFpbFwiLCBmdW5jdGlvbiAoZW1haWwpIHtcblxuXHRcdHZhciBlbWFpbCwgYm9keSwgZW5jcnlwdGVkTXNnO1xuXHRcblx0XHRlbWFpbCA9IG5ldyBnbWFpbDIuZG9tLmVtYWlsKGVtYWlsLmlkKVxuXHRcdGJvZHkgPSBlbWFpbC5ib2R5KCk7XG5cblx0XHQvL0VMSU1JTkFUSU5HIFBPU1NJQkxFIFRBR1MgSU5TRVJURUQgQlkgQ0hST01FXG5cdFx0dGFnc1JlZ0V4ID0gLzx7MX0uKz8+ezF9L2dcblx0XHRib2R5ID0gYm9keS5yZXBsYWNlKHRhZ3NSZWdFeCwgXCJcIik7XG5cblxuXHRcdGlmKGJvZHkuaW5kZXhPZihzZW50aW5lbCkgPiAtMSkge1xuXG5cdFx0XHRlbmNyeXB0ZWRNc2cgPSBib2R5Lm1hdGNoKHJlZ0V4KVswXS5zbGljZShzZW50aW5lbExlbmd0aCwgLXNlbnRpbmVsTGVuZ3RoKVxuXG5cdFx0XHQvLyBzZW5kVG9Db250ZW50U2NyaXB0KGJvZHkpO1xuXHRcdFx0dW5oYWNrZWQgPSB1bmhhY2tpbmcoZW5jcnlwdGVkTXNnKTtcblx0XHRcdGVtYWlsLmJvZHkodW5oYWNrZWQgKyAnPGg1PkRlY3J5cHRlZCBieSBDcnlwdG9WZWlsPC9oNT4nKVxuXHRcdH0gXG5cdH0pO1xufTtcblxuZnVuY3Rpb24gdW5oYWNraW5nKHRleHQpIHtcblxuXHR2YXIgZGVjcnlwdGVkLCB0ZW1wO1xuICAgIFxuICAgIGRlY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KHRleHQsIFwiU2VjcmV0IFBhc3NwaHJhc2VcIik7XG4gICAgdGVtcCA9IGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cbiAgICByZXR1cm4gdGVtcDtcbn1cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0RU5DUllQVElPTlx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBlbmNyeXB0ZWRNYWluID0gZnVuY3Rpb24gKCkge1xuXG5cdGdtYWlsMSA9IG5ldyBHbWFpbCgpO1xuXHQgIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGVuY3J5cHRlZE1haW4sJywgZ21haWwxLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdGZ1bmN0aW9uIGhhY2tpbmcodGV4dCkge1xuXHRcdHZhciB0ZW1wID0gXCJcIjtcblxuXHRcdGVuY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KHRleHQsIFwiU2VjcmV0IFBhc3NwaHJhc2VcIik7XG5cdFx0XG5cdFx0dGVtcCA9ICc8ZGl2IGRpcj1cImx0clwiPiAlJSUlJyArIGVuY3J5cHRlZCArICclJSUlIDwvZGl2PidcblxuXHRcdHJldHVybiB0ZW1wO1xuXHR9XG5cblx0dmFyIGVuY3J5cHRpb25FbmFibGVkID0gZmFsc2U7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZS1mcm9tLWNvbnRlbnQnLCBmdW5jdGlvbihlKSB7XG5cdFx0XG5cdFx0aWYgKGUuZGV0YWlsID09PSAndG9nZ2xlLWVuY3J5cHRpb24nKSB7XG5cdFx0XHRcblx0XHRcdGlmKCFlbmNyeXB0aW9uRW5hYmxlZCkge1xuXG5cdFx0XHRcdGVuY3J5cHRpb25FbmFibGVkID0gdHJ1ZTtcblx0XHRcdFx0XG5cdFx0XHRcdGdtYWlsMS5vYnNlcnZlLmJlZm9yZSgnc2VuZF9tZXNzYWdlJywgZnVuY3Rpb24odXJsLCBib2R5LCBkYXRhLCB4aHIpe1xuXHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgYm9keV9wYXJhbXM7XG5cdFx0XHRcdFx0Ym9keV9wYXJhbXMgPSB4aHIueGhyUGFyYW1zLmJvZHlfcGFyYW1zO1xuXHRcdFx0XHRcdGJvZHlfcGFyYW1zLmJvZHkgPSBoYWNraW5nKGJvZHlfcGFyYW1zLmJvZHkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRlbmNyeXB0aW9uRW5hYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHRnbWFpbDEub2JzZXJ2ZS5vZmYoJ3NlbmRfbWVzc2FnZScsICdiZWZvcmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG59OyAvL0VORCBPRiBNQUlOXG5cbi8vIHZhciBkZWNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdChlbmNyeXB0ZWQsIFwiU2VjcmV0IFBhc3NwaHJhc2VcIik7XG4vLyBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZGVjcnlwdGVkIG1lc3NhZ2UnLCBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpKVxuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaXNlbmQnLCB7XG5cdC8vIFx0ZGV0YWlsOmJvZHlfcGFyYW1zLmJvZHlcblx0Ly8gfSkpO1xuXG4vLyBnbWFpbDEub2JzZXJ2ZS5vbignb3Blbl9lbWFpbCcsIGZ1bmN0aW9uKG9iaikge1xuLy8gXHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyBvYmogZnJvbSBvcGVuX2VtYWlsJywgb2JqKVxuLy8gXHRcdHZhciBlbWFpbCA9IG5ldyBnbWFpbDEuZG9tLmVtYWlsKG9iailcbi8vIFx0XHQvLyBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZW1haWwnLCBlbWFpbCk7XG4vLyBcdFx0dmFyIGJvZHkgPSBlbWFpbC5ib2R5KCk7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGJvZHknLCBib2R5KTtcbi8vIFx0XHR2YXIgcmVzdWx0ID0gaGFja2luZyhib2R5KTtcbi8vIFx0XHRjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgcmVzdWx0JywgcmVzdWx0KVxuLy8gfSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdE1FU1NBR0lOR1x0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2VGcm9tRXh0ZW5zaW9uJywgZnVuY3Rpb24oZSkge1xuLy8gfSk7XG5cbmZ1bmN0aW9uIHNlbmRUb0NvbnRlbnRTY3JpcHQgKGRhdGEpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ21lc3NhZ2VGcm9tRXh0ZXJuYWwnLCB7IGRldGFpbDogZGF0YSB9KSk7XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRSRUZSRVNIRVNcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5yZWZyZXNoKGRlY3J5cHRlZE1haW4pO1xucmVmcmVzaChlbmNyeXB0ZWRNYWluKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==