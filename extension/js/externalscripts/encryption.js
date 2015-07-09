///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());

	var selectedCircleKey,
		selectedCircleId,
		encryptionEnabled = false,
		userCircles;

	document.addEventListener('set-encryption-circle', function (e) {
		selectedCircleKey = e.detail.key;
		selectedCircleId = e.detail._id;
	});

	document.addEventListener('process-login', function (e) {
		userCircles = e.detail;
	});

	document.addEventListener('process-logout', function (e) {

		encryptionEnabled = false,
		selectedCircleKey = '',
		selectedCircleId = '';

	});

	document.addEventListener('update-encryption-state', function (e) {
		console.log('update-state, encryption', e.detail);

		userCircles = e.detail.userCircles;
		selectedCircleKey = e.detail.selectedCircle.key;
		selectedCircleId = e.detail.selectedCircle._id;
		encryptionEnabled = e.detail.encryptionState;

	});

	document.addEventListener('toggle-encryption', function(e) {

		if(!encryptionEnabled) {

			console.log('encryption enabled!');
			encryptionEnabled = true;
			
		} else {

			console.log('encryption disabled!');
			encryptionEnabled = false;
		}
	});

	function shouldWeAlet () {
		return (encryptionEnabled && gmail1.dom.composes().length && !selectedCircleId);
	}
	
	// setTimeout(function () {

	// 	console.log('in load listener', encryptionEnabled, gmail1.dom.composes().length, !selectedCircleId )
	// 	// CHECK FOR OPEN COMPOSE WINDOWS
	// 	if (shouldWeAlet()) {
	// 		alert('Please select a circle!');
	// 	}
	// 	console.log('in load listener', encryptionEnabled, gmail1.dom.composes().length, !selectedCircleId )

	// }, 1500);

	// $(document).ready(function () {

	// });



	//WHEN COMPOSE WINDOW OPENS, CHECK FOR SELECTED CIRCLE
	gmail1.observe.on('compose', function (compose, type) {

		if (encryptionEnabled && !selectedCircleId) {
			alert('Please select a circle!');
		}
		
	});
	
	gmail1.observe.before('send_message', function(url, body, data, xhr){
	
		var body_params;

		if (encryptionEnabled && selectedCircleId) {

			body_params = xhr.xhrParams.body_params;
			body_params.body = encrypt(body_params.body, selectedCircleKey, selectedCircleId);

		} else if (encryptionEnabled && !selectedCircleId){

			body_params = xhr.xhrParams.body_params;
			body_params.body = '<div dir="ltr">This message has been deleted' + 
			' because an encryption circle was not selected</div>';
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

//////////////////////// NOT IN USE ////////////////////////

// gmail1.tools.add_modal_window('Select circle', 'Please select a circle!', function() {
    
// });

// function sendToContentScript (command) {
// 	document.dispatchEvent(new Event(command));
// 	// EXAMPLE
// 	// sendToContentScript('toggle-encryption-off');
// 	// sendToContentScript('toggle-encryption-on');
// 	}

// function gmailAlertModal () {
// 	var startingStr = "Please select a circle this email is intended for: <br /><select>";

// 	userCircles.forEach(function (circle) {
// 		startingStr += "<option value='" + circle._id +  "'>" + circle.name + "</option>"	
// 	});

// 	startingStr += "</select>"

// 	return startingStr;
// }
