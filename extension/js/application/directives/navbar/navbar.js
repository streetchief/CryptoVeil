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

            scope.user;

            scope.isLoggedIn = function () {
                return BackgroundFactory.isLoggedIn();
            };

            scope.logout = function () {
                BackgroundFactory.logOutUser()
                .then(function (statusCode) {
                    $state.go('login');                
                    $rootScope.isLoggedIn = false;
                    scope.user = null;
                })
                .catch(function(err) {
                    console.log(err);
                })
            };

            var showUserOnNavbar = function () {
                BackgroundFactory.checkLoggedIn()
                .then(function (response) {
                    var userLoggedIn = response.data.user;
                    scope.user = userLoggedIn;
                })
                .catch(function(err) {
                    console.log(err);
                })
            };

            showUserOnNavbar();

            // var removeUserOnScope = function () {
            //     scope.user = null;
            // };


            // $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }
    };
});