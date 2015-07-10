app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/application/states/register/register.html',
        controller: 'registerController'
    });

});

app.controller('registerController', function ($scope, BackgroundFactory, $state, $rootScope) {

    var backgroundPage = BackgroundFactory.getBackgroundPage();
    var currentUser = backgroundPage.user;

    $scope.register = {};
    $scope.error = null;

    $scope.createUser = function (signUpInfo) {

        $scope.error = null;

        BackgroundFactory.registerUser(signUpInfo)
        .then(function(userInfo) {
            currentUser.setLoggedInUser(signUpInfo);
            $rootScope.isLoggedIn = true;            
            $state.go('home')
        })
        .catch(function(err) {
            console.log(err);
        })
    };
});
