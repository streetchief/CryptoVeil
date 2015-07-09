app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'accountController',
        templateUrl: 'js/application/states/account/account.html'
    });

    $stateProvider.state('nickname', {
        url: '/nickname',
        controller: 'nicknameController',
        templateUrl: 'js/application/states/account/nickname.html'
    });

    $stateProvider.state('resetPassword', {
        url: '/password',
        controller: 'passwordController',
        templateUrl: 'js/application/states/account/password.html'
    });

    $stateProvider.state('checkPassword', {
        url: '/delete',
        controller: 'checkPasswordController',
        templateUrl: 'js/application/states/account/delete-password.html'
    });

    $stateProvider.state('deleteAccount', {
        url: '/deleteAccount',
        controller: 'deleteAccountController',
        templateUrl: 'js/application/states/account/delete-submit.html'
    });    
});

app.controller('accountController', function ($scope, $state) {

});

app.controller('nicknameController', function ($scope, UserFactory) {

});

app.controller('passwordController', function ($scope, UserFactory) {

});

app.controller('checkPasswordController', function ($scope, $state, UserFactory) {
  
  $scope.alert = false;

  $scope.sendPassword = function (password) {
    UserFactory.checkUserByPassword(password)
    .then(function(res) {
      console.log('this is res')
      if(res === 'password does not match') {        
        return $scope.alert = true;              
        console.log('Oops, your password does not match.');
      } else {
        $state.go('deleteAccount');
      }
    })
    .catch(function(err) {
      console.log('error', err);
    })
  }

  $scope.closeAlert = function() {
      $scope.alert = false;
  };  
})


app.controller('deleteAccountController', function ($scope, UserFactory) {

});