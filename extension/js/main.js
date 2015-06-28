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
	var backgroundPage = chrome.extension.getBackgroundPage();
  $scope.msg = 'Yoo';

	  // decryptionEngaged = true;
  $scope.googleEncryptionOn = 0;

  // backgroundPage.tabGetter();
  
  $scope.logInBG = function (msg) {

  	backgroundPage.logInBackground(msg);
  }

  $scope.reqInterceptToggle = function () {
		// encryptionEngaged = !encryptionEngaged;
    backgroundPage.reqBodyIntercept();
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInN0YXRlcy9ob21lL2hvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnlwdG92ZWlsRXh0JywgWyd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblx0dmFyIGJhY2tncm91bmRQYWdlLCBkZWNyeXB0aW9uRW5nYWdlZCwgZ29vZ2xlRW5jcnlwdGlvbk9uO1xuXHR2YXIgYmFja2dyb3VuZFBhZ2UgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4gICRzY29wZS5tc2cgPSAnWW9vJztcblxuXHQgIC8vIGRlY3J5cHRpb25FbmdhZ2VkID0gdHJ1ZTtcbiAgJHNjb3BlLmdvb2dsZUVuY3J5cHRpb25PbiA9IDA7XG5cbiAgLy8gYmFja2dyb3VuZFBhZ2UudGFiR2V0dGVyKCk7XG4gIFxuICAkc2NvcGUubG9nSW5CRyA9IGZ1bmN0aW9uIChtc2cpIHtcblxuICBcdGJhY2tncm91bmRQYWdlLmxvZ0luQmFja2dyb3VuZChtc2cpO1xuICB9XG5cbiAgJHNjb3BlLnJlcUludGVyY2VwdFRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBlbmNyeXB0aW9uRW5nYWdlZCA9ICFlbmNyeXB0aW9uRW5nYWdlZDtcbiAgICBiYWNrZ3JvdW5kUGFnZS5yZXFCb2R5SW50ZXJjZXB0KCk7XG4gIH1cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9