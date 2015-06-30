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

  $scope.compose = function(){
    
  }

});
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'accountController',
        templateUrl: 'js/application/states/account/account.html'
    });

});

app.controller('accountController', function ($scope) {

}
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: 'js/application/states/login/login.html'
    });

});

app.controller('loginController', function ($scope) {

});
app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/application/states/register/register.html',
        controller: 'registerController'
    });

});

app.controller('registerController', function ($scope, AuthService, $state) {

    $scope.register = {};
    $scope.error = null;

    $scope.createUser = function (user) {

        $scope.error = null;

        UserFactory.createUser(user)
        .then(function() {
            return AuthService.login(user);
        })
        .then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid credentials.';
        });
    };

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIiwic3RhdGVzL2FjY291bnQvYWNjb3VudC5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbi5qcyIsInN0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnlwdG92ZWlsRXh0JywgWyd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuIiwiLy8gYXBwLmZhY3RvcnkoJ0ludGVyY2VwdG9yRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuLy8gICByZXR1cm4ge1xuLy8gICAgIC8vIGJhY2tncm91bmRQYWdlOiBmdW5jdGlvbigpIHtcbi8vICAgICAvLyAgIGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbi8vICAgICAvLyB9XG4vLyAgIH1cbi8vIH0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblx0dmFyIGJhY2tncm91bmRQYWdlLCBkZWNyeXB0aW9uRW5nYWdlZCwgZ29vZ2xlRW5jcnlwdGlvbk9uO1xuXG5cdGJhY2tncm91bmRQYWdlID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpO1xuICAkc2NvcGUubXNnID0gJ1JlcSBJbnRlcmNlcHQgVG9nZ2xlJztcbiAgJHNjb3BlLmdvb2dsZUVuY3J5cHRpb25PbiA9IDA7XG5cbiAgLy8gYmFja2dyb3VuZFBhZ2UudGFiR2V0dGVyKCk7XG5cdCAgLy8gZGVjcnlwdGlvbkVuZ2FnZWQgPSB0cnVlO1xuXG4vLyBicm93c2VyQWN0aW9uLnNldEljb24oL2pzL3JlZCkgLy97cGF0aDogXCIvcGF0aC9oZXJlXCIsIFwidGFiSWQ6IGlkb2Z0YWJcIn1cblxuICBcbiAgJHNjb3BlLmxvZ0luQkcgPSBmdW5jdGlvbiAobXNnKSB7XG4gIFx0YmFja2dyb3VuZFBhZ2UubG9nSW5CYWNrZ3JvdW5kKG1zZyk7XG4gIH1cbiAgXG4gICRzY29wZS5ydW5TY2FuID0gZnVuY3Rpb24gKCkge1xuICAgIGJhY2tncm91bmRQYWdlLnJ1blNjYW4oKTtcbiAgfVxuXG4gICRzY29wZS5yZXFJbnRlcmNlcHRUb2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgYmFja2dyb3VuZFBhZ2UucmVxQm9keUludGVyY2VwdCgpO1xuICB9XG5cbiAgJHNjb3BlLmNvbXBvc2UgPSBmdW5jdGlvbigpe1xuICAgIFxuICB9XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWNjb3VudCcsIHtcbiAgICAgICAgdXJsOiAnL2FjY291bnQnLFxuICAgICAgICBjb250cm9sbGVyOiAnYWNjb3VudENvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcGxpY2F0aW9uL3N0YXRlcy9hY2NvdW50L2FjY291bnQuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdhY2NvdW50Q29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxufSIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcGxpY2F0aW9uL3N0YXRlcy9sb2dpbi9sb2dpbi5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckNvbnRyb2xsZXInXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcigncmVnaXN0ZXJDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgQXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuXG4gICAgJHNjb3BlLnJlZ2lzdGVyID0ge307XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgICRzY29wZS5jcmVhdGVVc2VyID0gZnVuY3Rpb24gKHVzZXIpIHtcblxuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIFVzZXJGYWN0b3J5LmNyZWF0ZVVzZXIodXNlcilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gQXV0aFNlcnZpY2UubG9naW4odXNlcik7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSAnSW52YWxpZCBjcmVkZW50aWFscy4nO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=