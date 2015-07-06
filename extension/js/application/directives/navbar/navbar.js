app.directive('navBar', function ($rootScope, $state, BackgroundFactory) {
    
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/js/application/directives/navbar/navbar.html',
        link: function (scope) {

            // scope.background = BackgroundFactory.backgroundPage();

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Manage Circles', state: 'circles' },
                { label: 'Account Management', state: 'account' },
                { label: 'Register', state: 'register' }
            ];

            // scope.user = null;

            scope.isLoggedIn = function () {
                return BackgroundFactory.isLoggedIn();
            };

            scope.logout = function () {

                BackgroundFactory.logOutUser()
                .then(function (statusCode) {

                    $state.go('login');
                })
                .catch(function(err) {
                    console.log(err);
                })
            };

            // var setUser = function () {
            //     AuthService.getLoggedInUser().then(function (user) {
            //         console.log('hit navbar', user)
            //         scope.user = user;
            //         // if (user.userType !== 'User')
            //         //     scope.items[2].label = 'Manage Store';
            //     });
            // };

            // var removeUser = function () {
            //     scope.user = null;
            // };

            // setUser();

            // $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }
    };
});