app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/',
        controller: 'loginController',
        templateUrl: 'js/application/states/login/login.html'
    });

});

app.controller('loginController', function ($scope, BackgroundFactory, $state, $window, $location, $log) {
    $scope.login = {};
    $scope.error = null;
    $scope.loggedInUser = {};

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        BackgroundFactory.logInUser(loginInfo)
        .then(function(userInfo) {

            $state.go('home');
        })
        .catch(function(err) {
            console.log(err);
        })
    };

    $scope.redirectLogin = function(location){
      // console.log('oauth', location)
      // $window.location.href = "/auth/" + location;
        // $state.go('discover');
    };
});