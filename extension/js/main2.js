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

	gmail.observe.on("view_thread", function (thread) {
		gmail.observe.on("view_email", function (email) {
		
			var email = new gmail.dom.email(email.id)
			var body = email.body();
			email.body('<h1>Oh snap! yo email been jacked by CryptoVeil</h1>' + body)
		})	
	})  
}


document.addEventListener('messageFromExtension', function(e) {
});




refresh(main);