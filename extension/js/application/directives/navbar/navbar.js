app.directive('navBar', function ($rootScope, AuthService, AUTH_EVENTS, $state, BackgroundFactory) {
    
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
                { label: 'Logout', state: 'register' }
            ];

            scope.user = null;

            // scope.isLoggedIn = function () {
            //     return AuthService.isAuthenticated();
            // };

            // scope.logout = function () {
            //     AuthService.logout().then(function () {
            //        $state.go('login');
            //     });
            // };

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