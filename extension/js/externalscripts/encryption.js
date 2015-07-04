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
