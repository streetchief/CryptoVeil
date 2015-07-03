//////////////////////////	DECRYPTION	///////////////////////////////////
var decryptedMain = function () {
	gmail2 = new Gmail();

	console.log('Hello from decryptedMain,', gmail2.get.user_email());

	var regEx = /%%%%(.+)%%%%/gmi,
		sentinel = '%%%%',
		sentinelLength = sentinel.length,
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
			unhacked = unhacking(encryptedMsg);
			email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
		} 
	});
};

function unhacking(text) {

	var decrypted, temp;
    
    decrypted = CryptoJS.AES.decrypt(text, "Secret Passphrase");
    temp = decrypted.toString(CryptoJS.enc.Utf8);

    return temp;
}
