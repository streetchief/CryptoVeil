app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html',
        resolve: {
            toggleState: function (BackgroundFactory) {
              return BackgroundFactory.getBackgroundPage().encryptionState.getState();
            }
        }
    });
});

app.controller('homeController', function ($scope, BackgroundFactory, $log, toggleState) {

	var decryptionEngaged, encryptionOffMessage, encryptionOnMessage, backgroundPage;

  backgroundPage = BackgroundFactory.getBackgroundPage();
  $scope.encryptionState = toggleState;
  encryptionOffMessage = 'Encryption is off';
  encryptionOnMessage = 'Encryption is on';


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
      chrome.browserAction.setIcon({path: "/red128.png"})
    } else {
      $scope.stateMsg = encryptionOnMessage;
      chrome.browserAction.setIcon({path: "/green128.png"})
    }

    backgroundPage.encryptionToggle();

  };// End encryptionToggle


  $scope.setDecryptionCircle = function (selectedCircle) {

    $scope.currentCircle = selectedCircle.name;
    BackgroundFactory.setSelectedCircle(selectedCircle);
  };

});
