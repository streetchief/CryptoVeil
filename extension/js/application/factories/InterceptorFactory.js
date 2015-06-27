app.factory('InterceptorFactory', function() {
  return {
    webRequest: function(document) {
        chrome.tabs.getSelected(null, function(tab) {
          console.log('the tab argument: ', tab);
        });
    },

    reqBodyIntercept: function() {
      chrome.webRequest.onBeforeRequest.addListener(function (data) {
          console.log('the data: ', data);
      }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"])
    }
  }
})