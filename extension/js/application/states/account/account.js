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
        templateUrl: 'js/application/states/account/new-password.html'
    });

    $stateProvider.state('checkPassword', {
        url: '/check',
        controller: 'checkPasswordController',
        templateUrl: 'js/application/states/account/check-password.html',
        resolve: {
          PreviousState: [
            "$state",
            function ($state) {
              var currentStateData = {
                Name: $state.current.name
              };
              return currentStateData;
            }
          ]
        }
    });

    $stateProvider.state('deleteProceed', {
        url: '/deleteProceed',
        controller: 'deleteProceedController',
        templateUrl: 'js/application/states/account/delete-confirm.html'
    });

    $stateProvider.state('deleteAccount', {
        url: '/deleteAccount',
        controller: 'deleteAccountController',
        templateUrl: 'js/application/states/account/delete-submit.html'
    });     
});

app.controller('accountController', function ($scope, $state) {

});

app.controller('nicknameController', function ($rootScope, $scope, $state, UserFactory, BackgroundFactory) {
  
  var backgroundPage = chrome.extension.getBackgroundPage();
  var currentUser = backgroundPage.user;        
  
  $scope.sendNickname = function (nickname) {
    UserFactory.changeNickname(nickname)
    .then(function(res) {
      $rootScope.$broadcast('nicknameChange', nickname)
      })
    .then(function(e) {
      $state.go('home');      
    })
    .catch(function(err) {
      console.log('error', err);
    })
  }
});

app.controller('passwordController', function ($scope, $state, UserFactory) {

  $scope.alert = false;

  $scope.sendNewPassword = function (password) {
    UserFactory.resetPassword(password)
    .then(function(res) {
      if(res === 'password invalid') {
        return $scope.alert = true;
      } else {
        $state.go('home');
      }
    })
    .catch(function(err) {
      console.log('error', err);
    })
  }

  $scope.closeAlert = function() {
      $scope.alert = false;
  };  
});

app.controller('checkPasswordController', function ($scope, $state, UserFactory, PreviousState) {


  $scope.alert = false;

  $scope.sendPassword = function (password) {
    UserFactory.checkUserByPassword(password)
    .then(function(res) {
      console.log('this is res')
      if(res === 'password does not match') {        
        return $scope.alert = true;              
      } else {
        if(PreviousState === 'deleteProceed') {
          $state.go('deleteAccount')
        }
        else {          
          $state.go('deleteAccount');
        }
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

app.controller('deleteProceedController', function ($scope, $state) {

});

app.controller('deleteAccountController', function ($scope, UserFactory) {

});