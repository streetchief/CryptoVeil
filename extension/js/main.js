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

// app.factory('InterceptorFactory', function() {
//   return {
//     // backgroundPage: function() {
//     //   chrome.extension.getBackgroundPage();
//     // }
//   }
// })
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
    });

});

app.controller('homeController', function ($scope) {

	var backgroundPage, decryptionEngaged, googleEncryptionOn;

	backgroundPage = chrome.extension.getBackgroundPage();
  $scope.msg = 'Req Intercept Toggle';
  $scope.googleEncryptionOn = 0;

  // backgroundPage.tabGetter();
	  // decryptionEngaged = true;

// browserAction.setIcon(/js/red) //{path: "/path/here", "tabId: idoftab"}

  
  $scope.logInBG = function (msg) {
  	backgroundPage.logInBackground(msg);
  }
  
  $scope.runScan = function () {
    backgroundPage.runScan();
  }

  $scope.reqInterceptToggle = function () {
    backgroundPage.reqBodyIntercept();
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ3J5cHRvdmVpbEV4dCcsIFsndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIi8vIGFwcC5mYWN0b3J5KCdJbnRlcmNlcHRvckZhY3RvcnknLCBmdW5jdGlvbigpIHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICAvLyBiYWNrZ3JvdW5kUGFnZTogZnVuY3Rpb24oKSB7XG4vLyAgICAgLy8gICBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4vLyAgICAgLy8gfVxuLy8gICB9XG4vLyB9KSIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvYXBwbGljYXRpb24vc3RhdGVzL2hvbWUvaG9tZS5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cdHZhciBiYWNrZ3JvdW5kUGFnZSwgZGVjcnlwdGlvbkVuZ2FnZWQsIGdvb2dsZUVuY3J5cHRpb25PbjtcblxuXHRiYWNrZ3JvdW5kUGFnZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgJHNjb3BlLm1zZyA9ICdSZXEgSW50ZXJjZXB0IFRvZ2dsZSc7XG4gICRzY29wZS5nb29nbGVFbmNyeXB0aW9uT24gPSAwO1xuXG4gIC8vIGJhY2tncm91bmRQYWdlLnRhYkdldHRlcigpO1xuXHQgIC8vIGRlY3J5cHRpb25FbmdhZ2VkID0gdHJ1ZTtcblxuLy8gYnJvd3NlckFjdGlvbi5zZXRJY29uKC9qcy9yZWQpIC8ve3BhdGg6IFwiL3BhdGgvaGVyZVwiLCBcInRhYklkOiBpZG9mdGFiXCJ9XG5cbiAgXG4gICRzY29wZS5sb2dJbkJHID0gZnVuY3Rpb24gKG1zZykge1xuICBcdGJhY2tncm91bmRQYWdlLmxvZ0luQmFja2dyb3VuZChtc2cpO1xuICB9XG4gIFxuICAkc2NvcGUucnVuU2NhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBiYWNrZ3JvdW5kUGFnZS5ydW5TY2FuKCk7XG4gIH1cblxuICAkc2NvcGUucmVxSW50ZXJjZXB0VG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIGJhY2tncm91bmRQYWdlLnJlcUJvZHlJbnRlcmNlcHQoKTtcbiAgfVxuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=