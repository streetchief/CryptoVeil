
var j = document.createElement('script');
j.src = chrome.extension.getURL('/js/jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('/js/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/main2.js');
(document.head || document.documentElement).appendChild(s);