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
		} 
		//THIS IS FOR VISUAL FEEDBACK THAT IT'S WORKING
		email.body(unhacked + '<h5>Decrypted by CryptoVeil</h5>')
	})
};

		function unhacking(text) {
		    console.log('hit unhacking', text)
		    // var encryptedText = text.slice(15,-6);
		    var decrypted = CryptoJS.AES.decrypt(text, "Secret Passphrase");
		    var temp = decrypted.toString(CryptoJS.enc.Utf8);
		    console.log('this is the decrypted message', temp)
		    return temp;
		}


