app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'accountController',
        templateUrl: 'js/application/states/account/account.html'
    });

});

app.controller('accountController', function ($scope) {

});
