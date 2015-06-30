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
    $stateProvider.state('account', {
        url: '/account',
        controller: 'accountController',
        templateUrl: 'js/application/states/account/account.html'
    });

});

app.controller('accountController', function ($scope) {

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

app.controller('registerController', function ($scope, $state) {

/*    $scope.register = {};
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
    };*/
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvYWNjb3VudC9hY2NvdW50LmpzIiwic3RhdGVzL2hvbWUvaG9tZS5qcyIsInN0YXRlcy9sb2dpbi9sb2dpbi5qcyIsInN0YXRlcy9yZWdpc3Rlci9yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NyeXB0b3ZlaWxFeHQnLCBbJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHJlcXVpcmVCYXNlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG4iLCIvLyBhcHAuZmFjdG9yeSgnSW50ZXJjZXB0b3JGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG4vLyAgIHJldHVybiB7XG4vLyAgICAgLy8gYmFja2dyb3VuZFBhZ2U6IGZ1bmN0aW9uKCkge1xuLy8gICAgIC8vICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpO1xuLy8gICAgIC8vIH1cbi8vICAgfVxuLy8gfSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgLy8gUmVnaXN0ZXIgb3VyICphYm91dCogc3RhdGUuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2FjY291bnQnLCB7XG4gICAgICAgIHVybDogJy9hY2NvdW50JyxcbiAgICAgICAgY29udHJvbGxlcjogJ2FjY291bnRDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvYWNjb3VudC9hY2NvdW50Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignYWNjb3VudENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblx0dmFyIGJhY2tncm91bmRQYWdlLCBkZWNyeXB0aW9uRW5nYWdlZCwgZ29vZ2xlRW5jcnlwdGlvbk9uO1xuXG5cdGJhY2tncm91bmRQYWdlID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpO1xuICAkc2NvcGUubXNnID0gJ1JlcSBJbnRlcmNlcHQgVG9nZ2xlJztcbiAgJHNjb3BlLmdvb2dsZUVuY3J5cHRpb25PbiA9IDA7XG5cbiAgLy8gYmFja2dyb3VuZFBhZ2UudGFiR2V0dGVyKCk7XG5cdCAgLy8gZGVjcnlwdGlvbkVuZ2FnZWQgPSB0cnVlO1xuXG4vLyBicm93c2VyQWN0aW9uLnNldEljb24oL2pzL3JlZCkgLy97cGF0aDogXCIvcGF0aC9oZXJlXCIsIFwidGFiSWQ6IGlkb2Z0YWJcIn1cblxuICBcbiAgJHNjb3BlLmxvZ0luQkcgPSBmdW5jdGlvbiAobXNnKSB7XG4gIFx0YmFja2dyb3VuZFBhZ2UubG9nSW5CYWNrZ3JvdW5kKG1zZyk7XG4gIH1cbiAgXG4gICRzY29wZS5ydW5TY2FuID0gZnVuY3Rpb24gKCkge1xuICAgIGJhY2tncm91bmRQYWdlLnJ1blNjYW4oKTtcbiAgfVxuXG4gICRzY29wZS5yZXFJbnRlcmNlcHRUb2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgYmFja2dyb3VuZFBhZ2UucmVxQm9keUludGVyY2VwdCgpO1xuICB9XG5cbiAgJHNjb3BlLmNvbXBvc2UgPSBmdW5jdGlvbigpe1xuICAgIFxuICB9XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcGxpY2F0aW9uL3N0YXRlcy9sb2dpbi9sb2dpbi5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyZWdpc3RlcicsIHtcbiAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckNvbnRyb2xsZXInXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcigncmVnaXN0ZXJDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlKSB7XG5cbi8qICAgICRzY29wZS5yZWdpc3RlciA9IHt9O1xuICAgICRzY29wZS5lcnJvciA9IG51bGw7XG5cbiAgICAkc2NvcGUuY3JlYXRlVXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG5cbiAgICAgICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgICAgICBVc2VyRmFjdG9yeS5jcmVhdGVVc2VyKHVzZXIpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIEF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gJ0ludmFsaWQgY3JlZGVudGlhbHMuJztcbiAgICAgICAgfSk7XG4gICAgfTsqL1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=