'use strict';
window.app = angular.module('Cryptoveil', ['ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

/*
app.run(function ($state) {
	$state.go('home');
})
*/

/*document.addEventListener('DOMContentLoaded', function () {
	
	var checkPageButton = document.getElementById('checkPage');
	
	checkPageButton.addEventListener('click', function (){

		chrome.tabs.getSelected(null, function (tab) {

			console.dir('inside popup.js', tab);

			var d = document;

			f = d.createElement('form');
			f.action = 'http://gtmetrix.com/analyze.html?bm';
			f.method = 'post';
			var i = d.createElement('input');
			i.type = 'hidden';
			i.name = 'url';
			i.value = tab.url;
			f.appendChild(i);
			d.body.appendChild(f);
			f.submit();
		});
	}, false);
}, false);
*/
/*
browserAction.setIcon
*/
