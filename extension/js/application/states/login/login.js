app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/',
        controller: 'loginController',
        templateUrl: 'js/application/states/login/login.html'
    });

});

app.controller('loginController', function ($rootScope, $scope, BackgroundFactory, $state, $window, $location, $log) {
    $scope.login = {};
    $scope.error = null;
    $scope.loggedInUser = {};

    var backgroundPage = BackgroundFactory.getBackgroundPage();
    var currentUser = backgroundPage.user;

    function checkUserLoggedIn() {
        BackgroundFactory.checkLoggedIn()
        .then(function (response) {
            console.log('hit login.js', response)

            if(response) {
            var userLoggedIn = response.user;
                currentUser.setLoggedInUser(userLoggedIn);
                $rootScope.isLoggedIn = true;
                $state.go('home');
            } else {
                currentUser.setLogOutUser();
                $rootScope.isLoggedIn = false;
                $state.go('login');
            }
        })
        .catch(function(err) {
            console.log('in checkUserLoggedIn', err);
        })
    };

    checkUserLoggedIn();

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        BackgroundFactory.logInUser(loginInfo)
        .then(function (userInfo) {
            $rootScope.isLoggedIn = true;
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