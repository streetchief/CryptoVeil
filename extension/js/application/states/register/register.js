app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/application/states/register/register.html',
        controller: 'registerController'
    });

});

app.controller('registerController', function ($scope, BackgroundFactory, $state) {

    $scope.register = {};
    $scope.error = null;

    $scope.createUser = function (signUpInfo) {

        $scope.error = null;

        BackgroundFactory.registerUser(signUpInfo)
        .then(function(userInfo) {
            $scope.register = BackgroundFactory.setUser(userInfo.data.user);
            console.log('this is $scope.register', $scope.register)
        })
        .then(function() {
            $state.go('home')
        })
        .catch(function(err) {
            console.log(err);
        })
    };
});
