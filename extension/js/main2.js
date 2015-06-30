var gmail;
var gmail2;
var gmail3;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 1);
  } else {
    f();
  }
}

var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());

  var decrypted, encrypted;

	//////////////////////////	DECRYPTION	///////////////////////////////////
	/*  var regEx = /%%%%(.+)%%%%/gmi
  var sentinel = '%%%%';
  var sentinelLength = sentinel.length;

	gmail.observe.on("view_thread", function (thread) {});

	gmail.observe.on("view_email", function (email) {
	
		var email = new gmail.dom.email(email.id)
		var body = email.body();

		if(body.indexOf(sentinel) > -1) {
			var encryptedMsg = body.match(regEx)[0].slice(sentinelLength, -sentinelLength)
			console.log('body', encryptedMsg);
			// sendToContentScript(body);
		} 
		//THIS IS FOR VISUAL FEEDBACK THAT IT'S WORKING
		email.body('<h1>%CryptoVeil%</h1>' + body)
	})*/

	///////////////////////////	ENCRYPTION	///////////////////////////////////
	
	function hacking(text) {
		var temp="";

		encrypted = CryptoJS.AES.encrypt(text, "Secret Passphrase");
		
		console.log('this is the encrypted message', encrypted.toString());
		
		temp = '<div dir="ltr">' + encrypted + '</div>'
		// console.log('this is hacking func temp', temp);
		return temp;
	}

	gmail.observe.before('send_message', function(url, body, data, xhr){
		var body_params = xhr.xhrParams.body_params;

		// body_params.body = hacking(body_params.body);
		body_params.body = hacking(body_params.body);

		console.log('this is body params.body', body_params.body);
	})

	// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
	// console.log('this is the decrypted message', decrypted.toString(CryptoJS.enc.Utf8))
		// document.dispatchEvent(new CustomEvent('isend', {
		// 	detail:body_params.body
		// }));

	// gmail.observe.on('open_email', function(obj) {
	// 	// console.log('this is obj from open_email', obj)
	// 		var email = new gmail.dom.email(obj)
	// 		// console.log('this is the email', email);
	// 		var body = email.body();
	// 		// console.log('this is the body', body);
	// 		var result = hacking(body);
	// 		console.log('this is the result', result)
	// })
}
//end main

////////////////////////////	MESSAGING	///////////////////////////////////
document.addEventListener('messageFromExtension', function(e) {
});

function sendToContentScript (data) {
	document.dispatchEvent(new CustomEvent('messageFromExternal', { detail: data }));
}

var decryptedMain = function () {
	gmail2 = new Gmail();

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
}

// var encryptedMain = function () {
// 	gmail3 = new Gmail();
// }

refresh(decryptedMain);
// refresh(encryptedMain);
refresh(main);
