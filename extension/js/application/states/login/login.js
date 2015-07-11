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
    $scope.loggedInUser = {};
    $scope.alerts = [];

    var backgroundPage = BackgroundFactory.getBackgroundPage();
    var currentUser = backgroundPage.user;

    function checkUserLoggedIn() {
        BackgroundFactory.checkLoggedIn()
        .then(function (response) {

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
        .catch(function (err) {
            $log.warn('No user logged in.');
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
        .catch(function (err) {
            $scope.alerts.push({
                msg: err.data || 'no err msg',
                type: 'danger'
            });
        })
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // $scope.redirectLogin = function(location){
      // console.log('oauth', location)
      // $window.location.href = "/auth/" + location;
        // $state.go('discover');
    // };
});