////////////////////////////	MESSAGING	///////////////////////////////////
document.addEventListener('messageFromExtension', function(e) {
});

function sendToContentScript (data) {
	document.dispatchEvent(new CustomEvent('messageFromExternal', { detail: data }));
}
