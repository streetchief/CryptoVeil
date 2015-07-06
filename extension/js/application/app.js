'use strict';
window.app = angular.module('CryptoveilExt', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt']);

app.config(function ($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});


// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, BackgroundFactory) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    //FIXME -- this is bad and broken; how to implement?

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        
        $rootScope.isLoggedIn = BackgroundFactory.isLoggedIn();

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});