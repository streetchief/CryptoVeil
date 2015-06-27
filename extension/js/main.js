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

app.factory('InterceptorFactory', function() {
  return {
    
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

    $scope.processStuff = function (something) {
    	var backgroundPage = chrome.extension.getBackgroundPage();
    	backgroundPage.logInBackground(something);
      backgroundPage.tabGetter();
    }

    $scope.reqInterceptOnOff = function () {
      reqBodyIntercept();
    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NyeXB0b3ZlaWxFeHQnLCBbJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHJlcXVpcmVCYXNlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG4iLCJhcHAuZmFjdG9yeSgnSW50ZXJjZXB0b3JGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgXG4gIH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgICAgIC8vIHRlbXBsYXRlOiAnaGVsbG8nXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCBJbnRlcmNlcHRvckZhY3RvcnkpIHtcblxuICAgICRzY29wZS5tc2cgPSAnU3VwJztcblxuICAgICRzY29wZS5wcm9jZXNzU3R1ZmYgPSBmdW5jdGlvbiAoc29tZXRoaW5nKSB7XG4gICAgXHR2YXIgYmFja2dyb3VuZFBhZ2UgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4gICAgXHRiYWNrZ3JvdW5kUGFnZS5sb2dJbkJhY2tncm91bmQoc29tZXRoaW5nKTtcbiAgICAgIGJhY2tncm91bmRQYWdlLnRhYkdldHRlcigpO1xuICAgIH1cblxuICAgICRzY29wZS5yZXFJbnRlcmNlcHRPbk9mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlcUJvZHlJbnRlcmNlcHQoKTtcbiAgICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==