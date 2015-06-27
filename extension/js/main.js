'use strict';
window.app = angular.module('CryptoveilExt', ['ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});
/*
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'popup/home/home.html'
    });

});

app.controller('homeController', function ($scope) {

    $scope.msg = 'Sup';

});*/


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

app.factory('InterceptorFactory', function() {
  return {
    webRequest: function(document) {
        chrome.tabs.getSelected(null, function(tab) {
          console.log('the tab argument: ', tab);
        });
    },

    reqBodyIntercept: function() {
      chrome.webRequest.onBeforeRequest.addListener(function (data) {
          console.log('the data: ', data);
      }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"])
    }
  }
})
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
        // template: 'hello'
    });

});

app.controller('homeController', function ($scope, InterceptorFactory) {

    $scope.msg = 'Sup';

    $scope.button = function() {
      InterceptorFactory.webRequest();
      InterceptorFactory.reqBodyIntercept();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NyeXB0b3ZlaWxFeHQnLCBbJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHJlcXVpcmVCYXNlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG4vKlxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwb3B1cC9ob21lL2hvbWUuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgICRzY29wZS5tc2cgPSAnU3VwJztcblxufSk7Ki9cblxuXG4vKmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFxuXHR2YXIgY2hlY2tQYWdlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrUGFnZScpO1xuXHRcblx0Y2hlY2tQYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cblx0XHRjaHJvbWUudGFicy5nZXRTZWxlY3RlZChudWxsLCBmdW5jdGlvbiAodGFiKSB7XG5cblx0XHRcdGNvbnNvbGUuZGlyKCdpbnNpZGUgcG9wdXAuanMnLCB0YWIpO1xuXG5cdFx0XHR2YXIgZCA9IGRvY3VtZW50O1xuXG5cdFx0XHRmID0gZC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cdFx0XHRmLmFjdGlvbiA9ICdodHRwOi8vZ3RtZXRyaXguY29tL2FuYWx5emUuaHRtbD9ibSc7XG5cdFx0XHRmLm1ldGhvZCA9ICdwb3N0Jztcblx0XHRcdHZhciBpID0gZC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdFx0aS50eXBlID0gJ2hpZGRlbic7XG5cdFx0XHRpLm5hbWUgPSAndXJsJztcblx0XHRcdGkudmFsdWUgPSB0YWIudXJsO1xuXHRcdFx0Zi5hcHBlbmRDaGlsZChpKTtcblx0XHRcdGQuYm9keS5hcHBlbmRDaGlsZChmKTtcblx0XHRcdGYuc3VibWl0KCk7XG5cdFx0fSk7XG5cdH0sIGZhbHNlKTtcbn0sIGZhbHNlKTtcbiovXG4vKlxuYnJvd3NlckFjdGlvbi5zZXRJY29uXG4qL1xuIiwiYXBwLmZhY3RvcnkoJ0ludGVyY2VwdG9yRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHdlYlJlcXVlc3Q6IGZ1bmN0aW9uKGRvY3VtZW50KSB7XG4gICAgICAgIGNocm9tZS50YWJzLmdldFNlbGVjdGVkKG51bGwsIGZ1bmN0aW9uKHRhYikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGFiIGFyZ3VtZW50OiAnLCB0YWIpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVxQm9keUludGVyY2VwdDogZnVuY3Rpb24oKSB7XG4gICAgICBjaHJvbWUud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGhlIGRhdGE6ICcsIGRhdGEpO1xuICAgICAgfSwge3VybHM6IFtcIjxhbGxfdXJscz5cIl19LCBbXCJibG9ja2luZ1wiLCBcInJlcXVlc3RCb2R5XCJdKVxuICAgIH1cbiAgfVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgLy8gUmVnaXN0ZXIgb3VyICphYm91dCogc3RhdGUuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcGxpY2F0aW9uL3N0YXRlcy9ob21lL2hvbWUuaHRtbCdcbiAgICAgICAgLy8gdGVtcGxhdGU6ICdoZWxsbydcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsIEludGVyY2VwdG9yRmFjdG9yeSkge1xuXG4gICAgJHNjb3BlLm1zZyA9ICdTdXAnO1xuXG4gICAgJHNjb3BlLmJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgSW50ZXJjZXB0b3JGYWN0b3J5LndlYlJlcXVlc3QoKTtcbiAgICAgIEludGVyY2VwdG9yRmFjdG9yeS5yZXFCb2R5SW50ZXJjZXB0KCk7XG4gICAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9