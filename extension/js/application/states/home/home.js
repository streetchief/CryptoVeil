app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
        ,resolve: {
            toggleState: function (BackgroundFactory) {
              return BackgroundFactory.getBackgroundPage().encryptionState.getState();
            }
        }
    });

});

app.controller('homeController', function ($scope, BackgroundFactory, $log, toggleState) {

	var decryptionEngaged, encryptionOffMessage, encryptionOnMessage, backgroundPage;
  $scope.encryptionState = toggleState;

  encryptionOffMessage = 'Encryption is off';
  encryptionOnMessage = 'Encryption is on';

  backgroundPage = BackgroundFactory.getBackgroundPage();

  if (toggleState) {
    $scope.stateMsg = encryptionOnMessage;
  } else {
    $scope.stateMsg = encryptionOffMessage;
  }

  $scope.currentCircle = 'Your Circle';

  BackgroundFactory.getUserCircles()
  .then(function (circles) {

    $scope.userCircles = circles;
  })
  .then(null, $log.info);

  $scope.encryptionToggle = function () {

    if ($scope.encryptionState) {
      $scope.stateMsg = encryptionOffMessage;
    } else {
      $scope.stateMsg = encryptionOnMessage;
    }

    //FIXME -- This is broken.

    // if (!toggledOn) {
      
    //   chrome.browserAction.setIcon({path: "/green128.png"});
    // } else {
      
    //   chrome.browserAction.setIcon({path: "/red128.png"});
    // }

    backgroundPage.encryptionToggle();

  };// End encryptionToggle


  $scope.setDecryptionCircle = function (selectedCircle) {

    $scope.currentCircle = selectedCircle.name;
    BackgroundFactory.setSelectedCircle(selectedCircle);

  };

});