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
        // template: 'hello'
    });

});

app.controller('homeController', function ($scope) {

    $scope.msg = 'Sup';

    $scope.processStuff = function (something) {
        var backgroundPage = chrome.extension.getBackgroundPage();
        backgroundPage.logInBackground(something);
        backgroundPage.tabGetter();
    }

    $scope.reqInterceptOnOff = function () {
        var backgroundPage = chrome.extension.getBackgroundPage();
        backgroundPage.reqBodyIntercept();
    }

    // $scope.redirected = function () {
    //     console.log("hit redirect controller")
    //     var backgroundPage = chrome.extension.getBackgroundPage();
    //     backgroundPage.redirect();
    // }



});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInN0YXRlcy9ob21lL2hvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnlwdG92ZWlsRXh0JywgWyd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9hcHBsaWNhdGlvbi9zdGF0ZXMvaG9tZS9ob21lLmh0bWwnXG4gICAgICAgIC8vIHRlbXBsYXRlOiAnaGVsbG8nXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICAkc2NvcGUubXNnID0gJ1N1cCc7XG5cbiAgICAkc2NvcGUucHJvY2Vzc1N0dWZmID0gZnVuY3Rpb24gKHNvbWV0aGluZykge1xuICAgICAgICB2YXIgYmFja2dyb3VuZFBhZ2UgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4gICAgICAgIGJhY2tncm91bmRQYWdlLmxvZ0luQmFja2dyb3VuZChzb21ldGhpbmcpO1xuICAgICAgICBiYWNrZ3JvdW5kUGFnZS50YWJHZXR0ZXIoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUucmVxSW50ZXJjZXB0T25PZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kUGFnZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UucmVxQm9keUludGVyY2VwdCgpO1xuICAgIH1cblxuICAgIC8vICRzY29wZS5yZWRpcmVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImhpdCByZWRpcmVjdCBjb250cm9sbGVyXCIpXG4gICAgLy8gICAgIHZhciBiYWNrZ3JvdW5kUGFnZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgICAvLyAgICAgYmFja2dyb3VuZFBhZ2UucmVkaXJlY3QoKTtcbiAgICAvLyB9XG5cblxuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=