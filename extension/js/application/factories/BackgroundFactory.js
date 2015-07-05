app.factory('BackgroundFactory', function() {
  return {
    setUser: function(Info) {
    var backgroundPage = chrome.extension.getBackgroundPage();
      // console.dir(backgroundPage.userHello);
    
      // backgroundPage.userHello.setLoggedInUser(userInfo);
      var tester = new backgroundPage.userHello();
      console.log('this is tester.sayHi()', tester.sayHi(Info.email))
      return tester.setSayHi(Info.email).then(function(something) {
        return getSayHi()
      });
      // return backgroundPage.userHello.getLoggedInUser();
    }
  }
})