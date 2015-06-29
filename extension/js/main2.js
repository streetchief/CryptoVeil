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

gmail.observe.before('send_message', function(url, body, data, xhr){
	var body_params = xhr.xhrParams.body_params;
	console.log('this is body params.body', body_params.body);
	document.dispatchEvent(new CustomEvent('isend', {
		detail:body_params.body
	}));
})
}


refresh(main);

