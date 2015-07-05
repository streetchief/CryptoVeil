app.factory('BackgroundFactory', function() {
  return {
    setUser: function(Info) {
    console.log('this is Info in setUser', Info)
    var backgroundPage = chrome.extension.getBackgroundPage();    
      // var tester = new backgroundPage.userHello();
      // tester.setSayHi(Info.email);
      // return tester.getSayHi();
      var test = new backgroundPage.userHello();
      test.setLoggedInUser(Info);
      return test.getLoggedInUser();
    }
  }
})