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
			email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
		} 
	})
};

function unhacking(text) {
    console.log('hit unhacking', text);
    
    var decrypted = CryptoJS.AES.decrypt(text, "Secret Passphrase");
    var temp = decrypted.toString(CryptoJS.enc.Utf8);

    console.log('this is the decrypted message', temp);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVybmFsQXBwLmpzIiwiZGVjcnlwdGlvbi5qcyIsImVuY3J5cHRpb24uanMiLCJtZXNzYWdpbmcuanMiLCJyZWZyZXNoZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZXh0ZXJuYWxNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdtYWlsMTtcbnZhciBnbWFpbDI7XG5cbmZ1bmN0aW9uIHJlZnJlc2goZikge1xuICBpZiggKC9pbi8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkgfHwgKHVuZGVmaW5lZCA9PT0gR21haWwpICkge1xuICAgIHNldFRpbWVvdXQoJ3JlZnJlc2goJyArIGYgKyAnKScsIDEpO1xuICB9IGVsc2Uge1xuICAgIGYoKTtcbiAgfVxufSIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRERUNSWVBUSU9OXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGRlY3J5cHRlZE1haW4gPSBmdW5jdGlvbiAoKSB7XG5cdGdtYWlsMiA9IG5ldyBHbWFpbCgpO1xuXHRjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBkZWNyeXB0ZWRNYWluLCcsIGdtYWlsMi5nZXQudXNlcl9lbWFpbCgpKTtcblxuXHR2YXIgcmVnRXggPSAvJSUlJSguKyklJSUlL2dtaVxuICB2YXIgc2VudGluZWwgPSAnJSUlJSc7XG4gIHZhciBzZW50aW5lbExlbmd0aCA9IHNlbnRpbmVsLmxlbmd0aDtcbiAgdmFyIHVuaGFja2VkO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld190aHJlYWRcIiwgZnVuY3Rpb24gKHRocmVhZCkge30pO1xuXG5cdGdtYWlsMi5vYnNlcnZlLm9uKFwidmlld19lbWFpbFwiLCBmdW5jdGlvbiAoZW1haWwpIHtcblx0XG5cdFx0dmFyIGVtYWlsID0gbmV3IGdtYWlsMi5kb20uZW1haWwoZW1haWwuaWQpXG5cdFx0dmFyIGJvZHkgPSBlbWFpbC5ib2R5KCk7XG5cblx0XHQvL0VMSU1JTkFUSU5HIFBPU1NJQkxFIFRBR1MgSU5TRVJURUQgQlkgQ0hST01FXG5cdFx0dGFnc1JlZ0V4ID0gLzx7MX0uKz8+ezF9L2dcblx0XHRib2R5ID0gYm9keS5yZXBsYWNlKHRhZ3NSZWdFeCwgXCJcIik7XG5cblxuXHRcdGlmKGJvZHkuaW5kZXhPZihzZW50aW5lbCkgPiAtMSkge1xuXHRcdFx0dmFyIGVuY3J5cHRlZE1zZyA9IGJvZHkubWF0Y2gocmVnRXgpWzBdLnNsaWNlKHNlbnRpbmVsTGVuZ3RoLCAtc2VudGluZWxMZW5ndGgpXG5cdFx0XHRjb25zb2xlLmxvZygndGhlIGVuY3J5cHRlZE1zZzogJywgZW5jcnlwdGVkTXNnKTtcblx0XHRcdC8vIHNlbmRUb0NvbnRlbnRTY3JpcHQoYm9keSk7XG5cdFx0XHR1bmhhY2tlZCA9IHVuaGFja2luZyhlbmNyeXB0ZWRNc2cpO1xuXHRcdFx0ZW1haWwuYm9keSh1bmhhY2tlZCArICc8aDU+RGVjcnlwdGVkIGJ5IENyeXB0b1ZlaWw8L2g1PicpXG5cdFx0fSBcblx0fSlcbn07XG5cbmZ1bmN0aW9uIHVuaGFja2luZyh0ZXh0KSB7XG4gICAgY29uc29sZS5sb2coJ2hpdCB1bmhhY2tpbmcnLCB0ZXh0KTtcbiAgICBcbiAgICB2YXIgZGVjcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQodGV4dCwgXCJTZWNyZXQgUGFzc3BocmFzZVwiKTtcbiAgICB2YXIgdGVtcCA9IGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cbiAgICBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZGVjcnlwdGVkIG1lc3NhZ2UnLCB0ZW1wKTtcblxuICAgIHJldHVybiB0ZW1wO1xufVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRFTkNSWVBUSU9OXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGVuY3J5cHRlZE1haW4gPSBmdW5jdGlvbiAoKSB7XG5cdGdtYWlsMSA9IG5ldyBHbWFpbCgpO1xuXHQgIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGVuY3J5cHRlZE1haW4sJywgZ21haWwxLmdldC51c2VyX2VtYWlsKCkpO1xuXG5cdGZ1bmN0aW9uIGhhY2tpbmcodGV4dCkge1xuXHRcdHZhciB0ZW1wPVwiXCI7XG5cblx0XHRlbmNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdCh0ZXh0LCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBlbmNyeXB0ZWQgbWVzc2FnZScsIGVuY3J5cHRlZC50b1N0cmluZygpKTtcblx0XHRcblx0XHR0ZW1wID0gJzxkaXYgZGlyPVwibHRyXCI+ICUlJSUnICsgZW5jcnlwdGVkICsgJyUlJSUgPC9kaXY+J1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIGhhY2tpbmcgZnVuYyB0ZW1wJywgdGVtcCk7XG5cdFx0cmV0dXJuIHRlbXA7XG5cdH1cblxuXHRnbWFpbDEub2JzZXJ2ZS5iZWZvcmUoJ3NlbmRfbWVzc2FnZScsIGZ1bmN0aW9uKHVybCwgYm9keSwgZGF0YSwgeGhyKXtcblx0XHR2YXIgYm9keV9wYXJhbXMgPSB4aHIueGhyUGFyYW1zLmJvZHlfcGFyYW1zO1xuXG5cdFx0Ly8gYm9keV9wYXJhbXMuYm9keSA9IGhhY2tpbmcoYm9keV9wYXJhbXMuYm9keSk7XG5cdFx0Ym9keV9wYXJhbXMuYm9keSA9IGhhY2tpbmcoYm9keV9wYXJhbXMuYm9keSk7XG5cblx0XHRjb25zb2xlLmxvZygndGhpcyBpcyBib2R5IHBhcmFtcy5ib2R5JywgYm9keV9wYXJhbXMuYm9keSk7XG5cdH0pXG59O1xuXG4vLyB2YXIgZGVjcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoZW5jcnlwdGVkLCBcIlNlY3JldCBQYXNzcGhyYXNlXCIpO1xuLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGRlY3J5cHRlZCBtZXNzYWdlJywgZGVjcnlwdGVkLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KSlcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2lzZW5kJywge1xuXHQvLyBcdGRldGFpbDpib2R5X3BhcmFtcy5ib2R5XG5cdC8vIH0pKTtcblxuLy8gZ21haWwxLm9ic2VydmUub24oJ29wZW5fZW1haWwnLCBmdW5jdGlvbihvYmopIHtcbi8vIFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgb2JqIGZyb20gb3Blbl9lbWFpbCcsIG9iailcbi8vIFx0XHR2YXIgZW1haWwgPSBuZXcgZ21haWwxLmRvbS5lbWFpbChvYmopXG4vLyBcdFx0Ly8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGVtYWlsJywgZW1haWwpO1xuLy8gXHRcdHZhciBib2R5ID0gZW1haWwuYm9keSgpO1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBib2R5JywgYm9keSk7XG4vLyBcdFx0dmFyIHJlc3VsdCA9IGhhY2tpbmcoYm9keSk7XG4vLyBcdFx0Y29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHJlc3VsdCcsIHJlc3VsdClcbi8vIH0pXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHRNRVNTQUdJTkdcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlRnJvbUV4dGVuc2lvbicsIGZ1bmN0aW9uKGUpIHtcbn0pO1xuXG5mdW5jdGlvbiBzZW5kVG9Db250ZW50U2NyaXB0IChkYXRhKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdtZXNzYWdlRnJvbUV4dGVybmFsJywgeyBkZXRhaWw6IGRhdGEgfSkpO1xufVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1x0UkVGUkVTSEVTXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xucmVmcmVzaChkZWNyeXB0ZWRNYWluKTtcbnJlZnJlc2goZW5jcnlwdGVkTWFpbik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=