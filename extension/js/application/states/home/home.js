app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
    });

});

app.controller('homeController', function ($scope) {

	var backgroundPage, decryptionEngaged, googleEncryptionOn;

	backgroundPage = chrome.extension.getBackgroundPage();
  $scope.msg = 'Req Intercept Toggle';
  $scope.googleEncryptionOn = 0;

  $scope.currentCircle = 'Your Circle';

  $scope.encryptionToggle = function (toggledOn) {

    //FIXME -- THIS IS NOT CORRECT, RESETS ON POPUP CLOSE
      // use backgroundFactory.getStatus when it's built

    if (!toggledOn) {
      //go red
      chrome.browserAction.setIcon({path: "/green128.png"});
    } else {
      //go green 
      chrome.browserAction.setIcon({path: "/red128.png"});
    }

    backgroundPage.encryptionToggle();

  };// End encryptionToggle

  //backgroundFactory.getUserCircles.then
  $scope.userCircles = [
    {name: 'SuperHotness', id: '123344'},
    {name: 'Partytime', id: '5555555'}
  ];

  $scope.setDecryptionCircle = function (selectedCircle) {

    $scope.currentCircle = selectedCircle.name;
    // TODO -- backgroundFactory.setCurrentCircle(selectedCircle.id)

  };

  // backgroundPage.tabGetter();

});