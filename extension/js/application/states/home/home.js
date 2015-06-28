app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('home', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'js/application/states/home/home.html'
    });

});

app.controller('homeController', function ($scope) {

	var backgroundPage, decryptionEngaged, googleEncryptionOn;
	backgroundPage = chrome.extension.getBackgroundPage();
  $scope.msg = 'Yoo';

	  // decryptionEngaged = true;
  $scope.googleEncryptionOn = 0;

    // backgroundPage.tabGetter();
  
  $scope.logInBG = function () {
    backgroundPage.runScan();
  	// backgroundPage.logInBackground(msg);
  }

  $scope.reqInterceptToggle = function () {
		// encryptionEngaged = !encryptionEngaged;
    backgroundPage.reqBodyIntercept();
  }

});