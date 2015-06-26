app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        // templateUrl: 'home/home.html'
        template: 'hello'
    });

});

app.controller('HomeController', function ($scope, FullstackPics) {

    $scope.msg = 'Sup';

});