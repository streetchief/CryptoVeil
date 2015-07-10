///////////////////////////	ENCRYPTION	///////////////////////////////////
var encryptedMain = function () {

	gmail1 = new Gmail();
	console.log('Hello from encryptedMain,', gmail1.get.user_email());

	var selectedCircleKey,
		selectedCircleId,
		encryptionEnabled = false,
		userCircles,
		noCircleMsg = '<div dir="ltr">This message has been deleted' + 
	  	' because an encryption circle was not selected</div>';

	sendToContentScript('get-extension-session-status');

	function sendToContentScript (command) {
		document.dispatchEvent(new Event(command));
	}

	function shouldWeAlert () {
		return (encryptionEnabled && gmail1.dom.composes().length && !selectedCircleId);
	}

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

		userCircles = e.detail.userCircles;
		selectedCircleKey = e.detail.selectedCircle.key;
		selectedCircleId = e.detail.selectedCircle._id;
		encryptionEnabled = e.detail.encryptionState;
	});

	document.addEventListener('toggle-encryption', function (e) {

		if(!encryptionEnabled) {
			encryptionEnabled = true;
		} else {
			encryptionEnabled = false;
		}
	});

	//WHEN COMPOSE WINDOW OPENS, CHECK FOR SELECTED CIRCLE
	gmail1.observe.on('compose', function (compose, type) {

		if (encryptionEnabled && !selectedCircleId) {
			alert('Please select a circle!');
		}
	});

	setTimeout(function () {

		if (shouldWeAlert()) {
			alert('Please select a circle!');
		}
	}, 1000);

	gmail1.observe.before("save_draft", function(url, body, data, xhr) {

	  if (encryptionEnabled && selectedCircleId) {
	  	
	  	data.body = encrypt(data.body, selectedCircleKey, selectedCircleId);

	  } else if (encryptionEnabled && !selectedCircleId){

	  	data.body = noCircleMsg;
	  }
	});
	
	gmail1.observe.before('send_message', function(url, body, data, xhr){

		if (encryptionEnabled && selectedCircleId) {

			data.body = encrypt(data.body, selectedCircleKey, selectedCircleId);

		} else if (encryptionEnabled && !selectedCircleId){

			data.body = noCircleMsg;
		}
	});
}; //END OF MAIN

function encrypt(text, key, id) {

	var temp = "";

	encrypted = CryptoJS.AES.encrypt(text, key);
	
	temp = '<div dir="ltr"> %%%%' + encrypted + id + '%%%% </div>'

	return temp;
}

//////////////////////// NOT IN USE ////////////////////////

// gmail1.tools.add_modal_window('Select circle', 'Please select a circle!', function() {
    
// });


// function gmailAlertModal () {
// 	var startingStr = "Please select a circle this email is intended for: <br /><select>";

// 	userCircles.forEach(function (circle) {
// 		startingStr += "<option value='" + circle._id +  "'>" + circle.name + "</option>"	
// 	});

// 	startingStr += "</select>"

// 	return startingStr;
// }
