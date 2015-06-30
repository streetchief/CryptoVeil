//////////////////////////	DECRYPTION	///////////////////////////////////
var decryptedMain = function () {
	gmail2 = new Gmail();
	console.log('Hello from decryptedMain,', gmail2.get.user_email());

	var regEx = /%%%%(.+)%%%%/gmi
  var sentinel = '%%%%';
  var sentinelLength = sentinel.length;

	gmail2.observe.on("view_thread", function (thread) {});

	gmail2.observe.on("view_email", function (email) {
	
		var email = new gmail2.dom.email(email.id)
		var body = email.body();

		if(body.indexOf(sentinel) > -1) {
			var encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength)
			console.log('body', encryptedMsg);
			// sendToContentScript(body);
		} 
		//THIS IS FOR VISUAL FEEDBACK THAT IT'S WORKING
		email.body('<h1>%CryptoVeil%</h1>' + body)
	})
};
