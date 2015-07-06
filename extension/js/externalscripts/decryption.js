//////////////////////////	DECRYPTION	///////////////////////////////////
var decryptedMain = function () {
	gmail2 = new Gmail();

	console.log('Hello from decryptedMain,', gmail2.get.user_email());

	var regEx = /%%%%(.+)%%%%/gmi,
		sentinel = '%%%%',
		sentinelLength = sentinel.length,
		selectedCircleKey,
		selectedCircleId,
		selectedCircleName,
		unhacked;

	document.addEventListener('set-encryption-circle', function(e) {
		selectedCircleKey = e.detail.key;
		selectedCircleId = e.detail._id;
		selectedCircleName = e.detail.name;
	});

	gmail2.observe.on("view_thread", function (thread) {});

	gmail2.observe.on("view_email", function (email) {

		var email, body, encryptedMsg, circleId;
	
		email = new gmail2.dom.email(email.id)
		body = email.body();

		//ELIMINATING POSSIBLE TAGS INSERTED BY CHROME
		tagsRegEx = /<{1}.+?>{1}/g
		body = body.replace(tagsRegEx, "");


		if(body.indexOf(sentinel) > -1) {

			encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength);
			circleId = encryptedMsg.slice(-24);
			encryptedMsg = encryptedMsg.slice(0, -24);

			// sendToContentScript(body);
			unhacked = decrypt(encryptedMsg, selectedCircleKey);
			email.body(unhacked + '<h5>' + selectedCircleName +' | Decrypted by CryptoVeil</h5>')
		} 
	});
};

function decrypt(text, key) {

	var decrypted, temp;
    
    decrypted = CryptoJS.AES.decrypt(text, key);
    temp = decrypted.toString(CryptoJS.enc.Utf8);

    return temp;
}
