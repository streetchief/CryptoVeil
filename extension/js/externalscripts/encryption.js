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
