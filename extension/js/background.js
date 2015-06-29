'use strict';
function logInBackground (dataToLog) {
	console.log('In background.js');
	console.log(dataToLog);
}

function tabGetter () {
    chrome.tabs.getSelected(null, function(tab) {
      console.log('the tab argument: ', tab);
    });
}

function reqBodyIntercept() {
	console.log('listening...');

  chrome.webRequest.onBeforeRequest.addListener(function (data) {
      console.log('the data: ', data);
  }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"]);

  	//	IF WE NEED MANDRILL, EMAIL INFO FROM WEBREQUEST
    // chrome.webRequest.onBeforeRequest.addListener(function (data) {
    //   console.log('the data: ', data.requestBody);
    //   //to
    //   var toFieldArr = data.requestBody.formData.to;
    //   toFieldArr.pop();
    //   var toField = toFieldArr;
    //   console.log('this is to: ', toField);
    //   //cc
    //   var ccFieldArr = data.requestBody.formData.cc;
    //   ccFieldArr.pop();
    //   var ccField = ccFieldArr;
    //   console.log('cc: ', ccField);
    //   //bcc
    //   var bccFieldArr = data.requestBody.formData.bcc;
    //   bccFieldArr.pop();
    //   var bccField = bccFieldArr;
    //   console.log('bcc: ', bccField);
    //   //subject
    //   var subject = data.requestBody.formData.subject[0]
    //   console.log('subject: ', subject)
    //   //email body
    //   var emailBodyStr = data.requestBody.formData.body[0]
    //   var regExp = /\>([^<]+)\</;
    //   var emailBodyArr = regExp.exec(emailBodyStr);
    //   var emailBody = emailBodyArr[1]
    //   console.log('email body: ', emailBody)
    // }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"])
}

function runScan () {
	chrome.tabs.getSelected(null, function(tab) {

		chrome.tabs.sendMessage(tab.id, {message: 'hello'})
	})
}

chrome.runtime.onMessage.addListener(function (message, sender) {
	console.log('the message from background: ', message);
});
