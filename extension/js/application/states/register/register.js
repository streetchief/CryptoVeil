app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/application/states/register/register.html',
        controller: 'registerController'
    });

});

app.controller('registerController', function ($scope, BackgroundFactory, $state, $rootScope, UserFactory, $log) {

    var backgroundPage = BackgroundFactory.getBackgroundPage();
    var currentUser = backgroundPage.user;

    $scope.register = {};
    $scope.userExistError = false;
    $scope.passwordError = false;
    $scope.emailAddressError = false;

    $scope.createUser = function (signUpInfo) {
        
        if(!/@/.test(signUpInfo.email)) return $scope.emailAddressError = true;
        if(signUpInfo.password.length < 10) return $scope.passwordError = true;

        UserFactory.checkUserByEmail(signUpInfo.email)
        .then(function (response) {

            if(response === 'exists') return $scope.userExistError = true;
            else {
                BackgroundFactory.registerUser(signUpInfo)
                .then(function (userInfo) {
                    currentUser.setLoggedInUser(signUpInfo);
                    $rootScope.isLoggedIn = true;            
                    $state.go('home')
                })
            }
        })
        .catch(function (err) {
            $log.warn(err);
        });
    };
});
