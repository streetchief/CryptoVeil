app.factory('BackgroundFactory', function() {
  return {
    backgroundPage: function() {
      var backgroundPage = chrome.extension.getBackgroundPage();
      return backgroundPage;
    }
  }
})