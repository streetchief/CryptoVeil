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

	gmail.observe.on("open_email", function (emailID) {

		var email = new gmail.dom.email(emailID)
		var body = email.body();
		// console.log('the body: ', body);
		email.body('<h1>Yo email been jacked</h1>' + body)
})  
  
}


document.addEventListener('messageFromExtension', function(e) {
});




refresh(main);