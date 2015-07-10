app.directive('navBar', function ($rootScope, $state, BackgroundFactory) {
    
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/js/application/directives/navbar/navbar.html',
        link: function (scope) {
            
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Manage Circles', state: 'circles' },
                { label: 'Account Management', state: 'account' }
            ];

            scope.user;
            $rootScope.$on('nicknameChange', function (event, nickname) {
                if (scope.user) {
                    scope.user.nickname = nickname;
                };
            })
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
                    var userLoggedIn = response.user;
                    scope.user = userLoggedIn;
                })
                .catch(function(err) {
                    console.log(err);
                })
            };

            showUserOnNavbar();
        }
    };
});