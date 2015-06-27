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

    $scope.processStuff = function (something) {
    	var backgroundPage = chrome.extension.getBackgroundPage();
    	backgroundPage.logInBackground(something);
    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9JbnRlcmNlcHRvckZhY3RvcnkuanMiLCJzdGF0ZXMvaG9tZS9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ3J5cHRvdmVpbEV4dCcsIFsndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsImFwcC5mYWN0b3J5KCdJbnRlcmNlcHRvckZhY3RvcnknLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB3ZWJSZXF1ZXN0OiBmdW5jdGlvbihkb2N1bWVudCkge1xuICAgICAgICBjaHJvbWUudGFicy5nZXRTZWxlY3RlZChudWxsLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRhYiBhcmd1bWVudDogJywgdGFiKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlcUJvZHlJbnRlcmNlcHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgY2hyb21lLndlYlJlcXVlc3Qub25CZWZvcmVSZXF1ZXN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBkYXRhOiAnLCBkYXRhKTtcbiAgICAgIH0sIHt1cmxzOiBbXCI8YWxsX3VybHM+XCJdfSwgW1wiYmxvY2tpbmdcIiwgXCJyZXF1ZXN0Qm9keVwiXSlcbiAgICB9XG4gIH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgICAgIC8vIHRlbXBsYXRlOiAnaGVsbG8nXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCBJbnRlcmNlcHRvckZhY3RvcnkpIHtcblxuICAgICRzY29wZS5tc2cgPSAnU3VwJztcblxuICAgICRzY29wZS5idXR0b24gPSBmdW5jdGlvbigpIHtcbiAgICAgIEludGVyY2VwdG9yRmFjdG9yeS53ZWJSZXF1ZXN0KCk7XG4gICAgICBJbnRlcmNlcHRvckZhY3RvcnkucmVxQm9keUludGVyY2VwdCgpO1xuICAgIH1cblxuICAgICRzY29wZS5wcm9jZXNzU3R1ZmYgPSBmdW5jdGlvbiAoc29tZXRoaW5nKSB7XG4gICAgXHR2YXIgYmFja2dyb3VuZFBhZ2UgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4gICAgXHRiYWNrZ3JvdW5kUGFnZS5sb2dJbkJhY2tncm91bmQoc29tZXRoaW5nKTtcbiAgICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==