app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
        // ,resolve: {
        //     userCircles: function (BackgroundFactory) {
        //       return BackgroundFactory.getUserCircles(); 
        //     }
        // }
    });

});

app.controller('homeController', function ($scope, BackgroundFactory, $log) {

	var decryptionEngaged;
  $scope.encryptionState, $scope.stateMsg = 'Encryption is off';

  var backgroundPage = BackgroundFactory.getBackgroundPage();

  $scope.currentCircle = 'Your Circle';

  BackgroundFactory.getUserCircles()
  .then(function (circles) {

    $scope.userCircles = circles;
  })
  .then(null, $log.info);

  $scope.encryptionToggle = function () {

    if ($scope.encryptionState) {
      $scope.stateMsg = 'Encryption is off';
    } else {
      $scope.stateMsg = 'Encryption is on';
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

  // backgroundPage.tabGetter();

});