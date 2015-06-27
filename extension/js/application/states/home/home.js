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