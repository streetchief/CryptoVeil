var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 3);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());
 
  var regEx = /%%%%(.+)%%%%/gmi
  var sentinel = '%%%%';
  var sentinelLength = sentinel.length;

	
	gmail.observe.on("view_thread", function (thread) {})

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
		})	
	
	

	function sendToContentScript (data) {
		document.dispatchEvent(new CustomEvent('messageFromExternal', {
	        detail: data
	    }));
	}
}


document.addEventListener('messageFromExtension', function(e) {
});





refresh(main);