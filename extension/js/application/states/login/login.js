app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/',
        controller: 'loginController',
        templateUrl: 'js/application/states/login/login.html'
    });

});

app.controller('loginController', function ($scope, $http, AuthService, BackgroundFactory, $state, $window, $location) {
    $scope.login = {};
    $scope.error = null;
    $scope.loggedInUser = {};

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        var req = {
         method: 'POST',
         url: 'http://127.0.0.1:1337/login',
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        },
         data: { email: loginInfo.email, password: loginInfo.password }
        }

        $http(req)
        .then(function(userInfo) {
            console.log('userinfo initial', userInfo)
            $scope.loggedInUser = BackgroundFactory.setUser(userInfo.data.user);
            console.log('this is $scope.loggedInUser', $scope.loggedInUser)
        })
        .then(function() {
            $state.go('home')
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