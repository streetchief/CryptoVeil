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

  // backgroundPage.tabGetter();
	  // decryptionEngaged = true;

// browserAction.setIcon(/js/red) //{path: "/path/here", "tabId: idoftab"}



  // $scope.logInBG = function (msg) {
  // 	backgroundPage.logInBackground(msg);
  // }
  
  // $scope.runScan = function () {
  //   backgroundPage.runScan();
  // }

  // $scope.reqInterceptToggle = function () {
  //   backgroundPage.reqBodyIntercept();
  // }

  // $scope.compose = function(){
    
  // }

});