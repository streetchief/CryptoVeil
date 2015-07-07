///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());

	var selectedCircleKey;
	var selectedCircleId;
	var encryptionEnabled = false;

	document.addEventListener('set-encryption-circle', function(e) {
		console.log('trying to assign key and id to selectedCircleKey', e);
		selectedCircleKey = e.detail.key;
		selectedCircleId = e.detail._id;
	});

	document.addEventListener('toggle-encryption', function(e) {
			
		if(!encryptionEnabled) {

			console.log('encryption enabled!');

			encryptionEnabled = true;
			
			gmail1.observe.before('send_message', function(url, body, data, xhr){
			
				var body_params;
				body_params = xhr.xhrParams.body_params;
				body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);
			});
		} else {

			console.log('encryption disabled!');
			
			encryptionEnabled = false;
			gmail1.observe.off('send_message', 'before');
		}
	});

}; //END OF MAIN

function encrypt(text, key, id) {
	console.log('arguments for encrypt', arguments);
	var temp = "";

	encrypted = CryptoJS.AES.encrypt(text, key);
	
	temp = '<div dir="ltr"> %%%%' + encrypted + id + '%%%% </div>'

	return temp;
}
