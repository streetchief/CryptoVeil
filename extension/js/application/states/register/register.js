app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/application/states/register/register.html',
        controller: 'registerController'
    });

});

app.controller('registerController', function ($scope, $state) {

/*    $scope.register = {};
    $scope.error = null;

    $scope.createUser = function (user) {

        $scope.error = null;

        UserFactory.createUser(user)
        .then(function() {
            return AuthService.login(user);
        })
        .then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid credentials.';
        });
    };*/
});
