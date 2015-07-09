///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());

	var selectedCircleKey;
	var selectedCircleId;
	var encryptionEnabled = false;
	var userCircles;

	function sendToContentScript (command) {
		document.dispatchEvent(new Event(command));
	}

	document.addEventListener('set-encryption-circle', function(e) {
		selectedCircleKey = e.detail.key;
		selectedCircleId = e.detail._id;
	});

	document.addEventListener('process-login', function (e) {
		userCircles = e.detail;
	});

	document.addEventListener('process-logout', function (e) {

		encryptionEnabled = false;
		sendToContentScript('toggle-encryption-off');

		gmail1.observe.off('send_message', 'before');
		gmail1.observe.off('compose');
	});

	document.addEventListener('toggle-encryption', function(e) {

		if(!encryptionEnabled) {

			console.log('encryption enabled!');
			encryptionEnabled = true;
			sendToContentScript('toggle-encryption-on');

			gmail1.observe.on('compose', function(compose, type) {

				if (!selectedCircleId) {

					alert('Please select a circle!');

					// FIXME -- ok button broken?
					// gmail1.tools.add_modal_window('Select circle', 'Please select a circle!', function() {
					    
					// });
				}
			}); //END observe.on("compose")

			if (gmail1.dom.composes().length && !selectedCircleId) {
				alert('Please select a circle!');
			}
			
			gmail1.observe.before('send_message', function(url, body, data, xhr){
			
				var body_params;

				body_params = xhr.xhrParams.body_params;
				body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);
			});
		} else {

			console.log('encryption disabled!');
			
			encryptionEnabled = false;
			sendToContentScript('toggle-encryption-off');
			gmail1.observe.off('send_message', 'before');
			gmail1.observe.off('compose');
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

// function gmailAlertModal () {
// 	var startingStr = "Please select a circle this email is intended for: <br /><select>";

// 	userCircles.forEach(function (circle) {
// 		startingStr += "<option value='" + circle._id +  "'>" + circle.name + "</option>"	
// 	});

// 	startingStr += "</select>"

// 	return startingStr;
// }
