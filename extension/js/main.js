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
// browserAction.setIcon(/js/red)


  
  $scope.logInBG = function (msg) {
  	backgroundPage.logInBackground(msg);
  }

  $scope.reqInterceptToggle = function () {
    backgroundPage.reqBodyIntercept();
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnlwdG92ZWlsRXh0JywgWyd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuIiwiLy8gYXBwLmZhY3RvcnkoJ0ludGVyY2VwdG9yRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuLy8gICByZXR1cm4ge1xuLy8gICAgIC8vIGJhY2tncm91bmRQYWdlOiBmdW5jdGlvbigpIHtcbi8vICAgICAvLyAgIGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbi8vICAgICAvLyB9XG4vLyAgIH1cbi8vIH0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cdHZhciBiYWNrZ3JvdW5kUGFnZSwgZGVjcnlwdGlvbkVuZ2FnZWQsIGdvb2dsZUVuY3J5cHRpb25PbjtcblxuXHRiYWNrZ3JvdW5kUGFnZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgJHNjb3BlLm1zZyA9ICdSZXEgSW50ZXJjZXB0IFRvZ2dsZSc7XG4gICRzY29wZS5nb29nbGVFbmNyeXB0aW9uT24gPSAwO1xuXG4gIC8vIGJhY2tncm91bmRQYWdlLnRhYkdldHRlcigpO1xuXHQgIC8vIGRlY3J5cHRpb25FbmdhZ2VkID0gdHJ1ZTtcbi8vIGJyb3dzZXJBY3Rpb24uc2V0SWNvbigvanMvcmVkKVxuXG5cbiAgXG4gICRzY29wZS5sb2dJbkJHID0gZnVuY3Rpb24gKG1zZykge1xuICBcdGJhY2tncm91bmRQYWdlLmxvZ0luQmFja2dyb3VuZChtc2cpO1xuICB9XG5cbiAgJHNjb3BlLnJlcUludGVyY2VwdFRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBiYWNrZ3JvdW5kUGFnZS5yZXFCb2R5SW50ZXJjZXB0KCk7XG4gIH1cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9