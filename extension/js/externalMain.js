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
		key = 'Secret Passphrase',
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
			unhacked = decrypt(encryptedMsg, key);
			email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
		} 
	});
};

function decrypt(text, key) {

	var decrypted, temp;
    
    decrypted = CryptoJS.AES.decrypt(text, key);
    temp = decrypted.toString(CryptoJS.enc.Utf8);

    return temp;
}

///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());


	var key = 'Secret Passphrase';
	var encryptionEnabled = false;

	document.addEventListener('message-from-content', function(e) {
		
		if (e.detail === 'toggle-encryption') {
			
			if(!encryptionEnabled) {

				console.log('encryption enabled!');

				encryptionEnabled = true;
				
				gmail1.observe.before('send_message', function(url, body, data, xhr){
				
					var body_params;
					body_params = xhr.xhrParams.body_params;
					body_params.body = encrypt(body_params.body, key);
				});
			} else {

				console.log('encryption disabled!');
				
				encryptionEnabled = false;
				gmail1.observe.off('send_message', 'before');
			}
		}
	});

}; //END OF MAIN

function encrypt(text, key) {
	
	var temp = "";

	encrypted = CryptoJS.AES.encrypt(text, key);
	
	temp = '<div dir="ltr"> %%%%' + encrypted + '%%%% </div>'

	return temp;
}

////////////////////////////	MESSAGING	///////////////////////////////////
// document.addEventListener('messageFromExtension', function(e) {
// });

function sendToContentScript (data) {
	document.dispatchEvent(new CustomEvent('messageFromExternal', { detail: data }));
}

////////////////////////////	REFRESHES	///////////////////////////////////
refresh(decryptedMain);
refresh(encryptedMain);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJleHRlcm5hbE1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ21haWwxO1xudmFyIGdtYWlsMjtcblxuZnVuY3Rpb24gcmVmcmVzaChmKSB7XG4gIGlmKCAoL2luLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSB8fCAodW5kZWZpbmVkID09PSBHbWFpbCkgKSB7XG4gICAgc2V0VGltZW91dCgncmVmcmVzaCgnICsgZiArICcpJywgMSk7XG4gIH0gZWxzZSB7XG4gICAgZigpO1xuICB9XG59IiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdERFQ1JZUFRJT05cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgZGVjcnlwdGVkTWFpbiA9IGZ1bmN0aW9uICgpIHtcblx0Z21haWwyID0gbmV3IEdtYWlsKCk7XG5cblx0Y29uc29sZS5sb2coJ0hlbGxvIGZyb20gZGVjcnlwdGVkTWFpbiwnLCBnbWFpbDIuZ2V0LnVzZXJfZW1haWwoKSk7XG5cblx0dmFyIHJlZ0V4ID0gLyUlJSUoLispJSUlJS9nbWksXG5cdFx0c2VudGluZWwgPSAnJSUlJScsXG5cdFx0c2VudGluZWxMZW5ndGggPSBzZW50aW5lbC5sZW5ndGgsXG5cdFx0a2V5ID0gJ1NlY3JldCBQYXNzcGhyYXNlJyxcblx0XHR1bmhhY2tlZDtcblxuXHRnbWFpbDIub2JzZXJ2ZS5vbihcInZpZXdfdGhyZWFkXCIsIGZ1bmN0aW9uICh0aHJlYWQpIHt9KTtcblxuXHRnbWFpbDIub2JzZXJ2ZS5vbihcInZpZXdfZW1haWxcIiwgZnVuY3Rpb24gKGVtYWlsKSB7XG5cblx0XHR2YXIgZW1haWwsIGJvZHksIGVuY3J5cHRlZE1zZztcblx0XG5cdFx0ZW1haWwgPSBuZXcgZ21haWwyLmRvbS5lbWFpbChlbWFpbC5pZClcblx0XHRib2R5ID0gZW1haWwuYm9keSgpO1xuXG5cdFx0Ly9FTElNSU5BVElORyBQT1NTSUJMRSBUQUdTIElOU0VSVEVEIEJZIENIUk9NRVxuXHRcdHRhZ3NSZWdFeCA9IC88ezF9Lis/PnsxfS9nXG5cdFx0Ym9keSA9IGJvZHkucmVwbGFjZSh0YWdzUmVnRXgsIFwiXCIpO1xuXG5cblx0XHRpZihib2R5LmluZGV4T2Yoc2VudGluZWwpID4gLTEpIHtcblxuXHRcdFx0ZW5jcnlwdGVkTXNnID0gYm9keS5tYXRjaChyZWdFeClbMF0uc2xpY2Uoc2VudGluZWxMZW5ndGgsIC1zZW50aW5lbExlbmd0aClcblxuXHRcdFx0Ly8gc2VuZFRvQ29udGVudFNjcmlwdChib2R5KTtcblx0XHRcdHVuaGFja2VkID0gZGVjcnlwdChlbmNyeXB0ZWRNc2csIGtleSk7XG5cdFx0XHRlbWFpbC5ib2R5KHVuaGFja2VkICsgJzxoNT5EZWNyeXB0ZWQgYnkgQ3J5cHRvVmVpbDwvaDU+Jylcblx0XHR9IFxuXHR9KTtcbn07XG5cbmZ1bmN0aW9uIGRlY3J5cHQodGV4dCwga2V5KSB7XG5cblx0dmFyIGRlY3J5cHRlZCwgdGVtcDtcbiAgICBcbiAgICBkZWNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdCh0ZXh0LCBrZXkpO1xuICAgIHRlbXAgPSBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXG4gICAgcmV0dXJuIHRlbXA7XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdEVOQ1JZUFRJT05cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgZW5jcnlwdGVkTWFpbiA9IGZ1bmN0aW9uICgpIHtcblxuXHRnbWFpbDEgPSBuZXcgR21haWwoKTtcblx0Y29uc29sZS5sb2coJ0hlbGxvIGZyb20gZW5jcnlwdGVkTWFpbiwnLCBnbWFpbDEuZ2V0LnVzZXJfZW1haWwoKSk7XG5cblxuXHR2YXIga2V5ID0gJ1NlY3JldCBQYXNzcGhyYXNlJztcblx0dmFyIGVuY3J5cHRpb25FbmFibGVkID0gZmFsc2U7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZS1mcm9tLWNvbnRlbnQnLCBmdW5jdGlvbihlKSB7XG5cdFx0XG5cdFx0aWYgKGUuZGV0YWlsID09PSAndG9nZ2xlLWVuY3J5cHRpb24nKSB7XG5cdFx0XHRcblx0XHRcdGlmKCFlbmNyeXB0aW9uRW5hYmxlZCkge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlbmNyeXB0aW9uIGVuYWJsZWQhJyk7XG5cblx0XHRcdFx0ZW5jcnlwdGlvbkVuYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcblx0XHRcdFx0Z21haWwxLm9ic2VydmUuYmVmb3JlKCdzZW5kX21lc3NhZ2UnLCBmdW5jdGlvbih1cmwsIGJvZHksIGRhdGEsIHhocil7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBib2R5X3BhcmFtcztcblx0XHRcdFx0XHRib2R5X3BhcmFtcyA9IHhoci54aHJQYXJhbXMuYm9keV9wYXJhbXM7XG5cdFx0XHRcdFx0Ym9keV9wYXJhbXMuYm9keSA9IGVuY3J5cHQoYm9keV9wYXJhbXMuYm9keSwga2V5KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlbmNyeXB0aW9uIGRpc2FibGVkIScpO1xuXHRcdFx0XHRcblx0XHRcdFx0ZW5jcnlwdGlvbkVuYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0Z21haWwxLm9ic2VydmUub2ZmKCdzZW5kX21lc3NhZ2UnLCAnYmVmb3JlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxufTsgLy9FTkQgT0YgTUFJTlxuXG5mdW5jdGlvbiBlbmNyeXB0KHRleHQsIGtleSkge1xuXHRcblx0dmFyIHRlbXAgPSBcIlwiO1xuXG5cdGVuY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KHRleHQsIGtleSk7XG5cdFxuXHR0ZW1wID0gJzxkaXYgZGlyPVwibHRyXCI+ICUlJSUnICsgZW5jcnlwdGVkICsgJyUlJSUgPC9kaXY+J1xuXG5cdHJldHVybiB0ZW1wO1xufVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0TUVTU0FHSU5HXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZUZyb21FeHRlbnNpb24nLCBmdW5jdGlvbihlKSB7XG4vLyB9KTtcblxuZnVuY3Rpb24gc2VuZFRvQ29udGVudFNjcmlwdCAoZGF0YSkge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbWVzc2FnZUZyb21FeHRlcm5hbCcsIHsgZGV0YWlsOiBkYXRhIH0pKTtcbn1cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cdFJFRlJFU0hFU1x0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnJlZnJlc2goZGVjcnlwdGVkTWFpbik7XG5yZWZyZXNoKGVuY3J5cHRlZE1haW4pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9