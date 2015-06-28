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