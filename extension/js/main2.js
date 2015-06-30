var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 1);
  } else {
    f();
  }
}

		// var decrypted, encrypted
function hacking(text) {
	var temp="";

	var encrypted = CryptoJS.AES.encrypt(text, "Secret Passphrase");
	console.log('this is the encrypted message', encrypted.toString());
	
	temp = '<div dir="ltr">' + encrypted + '</div>'
	// console.log('this is hacking func temp', temp);
	return temp;
}

var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());

	gmail.observe.before('send_message', function(url, body, data, xhr){
		var body_params = xhr.xhrParams.body_params;

		// body_params.body = hacking(body_params.body);
		body_params.body = hacking(body_params.body);

		console.log('this is body params.body', body_params.body);

	// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
	// console.log('this is the decrypted message', decrypted.toString(CryptoJS.enc.Utf8))
		// document.dispatchEvent(new CustomEvent('isend', {
		// 	detail:body_params.body
		// }));
	})

	// gmail.observe.on('open_email', function(obj) {
	// 	// console.log('this is obj from open_email', obj)
	// 		var email = new gmail.dom.email(obj)
	// 		// console.log('this is the email', email);
	// 		var body = email.body();
	// 		// console.log('this is the body', body);
	// 		var result = hacking(body);
	// 		console.log('this is the result', result)
	// })
} //end main


refresh(main);
