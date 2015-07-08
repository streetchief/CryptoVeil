///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());

	var selectedCircleKey;
	var selectedCircleId;
	var encryptionEnabled = false;
	var userCircles;

	document.addEventListener('set-encryption-circle', function(e) {
		console.log('trying to assign key and id to selectedCircleKey', e);
		selectedCircleKey = e.detail.key;
		selectedCircleId = e.detail._id;
	});

	document.addEventListener('process-login', function (e) {
		console.log('inside encryption process-login, circles:', e.detail)
		userCircles = e.detail;
	});

	document.addEventListener('toggle-encryption', function(e) {
		
		//if encryption is off, turn on

		if(!encryptionEnabled) {

			console.log('encryption enabled!');
			encryptionEnabled = true;

			gmail1.observe.on("compose", function(compose, type) {

				if (!selectedCircleId) {
					alert('Please select a circle');

				}
			  
			});

			
			gmail1.observe.before('send_message', function(url, body, data, xhr){
			
				var body_params;

				body_params = xhr.xhrParams.body_params;
				body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);

				// if (!selectedCircleId) {
				// 	gmail1.tools.add_modal_window('Select circle', 'Please select a circle!', function() {
				// 	    console.log('this worked?', this)
				// 	    console.log('xhr', xhr)
				// 	 //    body_params = xhr.xhrParams.body_params;
				// 		// body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);
				// 	});
				// } else {
				// 	body_params = xhr.xhrParams.body_params;
				// 	body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);
				// }

			});
		} else {

			console.log('encryption disabled!');
			
			encryptionEnabled = false;
			gmail1.observe.off('send_message', 'before');
			gmail1.observe.off('compose', 'on');
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

function gmailAlertModal () {
	var startingStr = "Please select a circle this email is intended for: <br /><select>";

	userCircles.forEach(function (circle) {
		startingStr += "<option value='" + circle._id +  "'>" + circle.name + "</option>"	
	});

	startingStr += "</select>"

	return startingStr;
}
