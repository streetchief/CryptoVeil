app.factory('BackgroundFactory', function($http) {

    var backgroundPage = chrome.extension.getBackgroundPage();
    var currentUser = backgroundPage.user;
    var server = 'http://127.0.0.1:1337';
    
    var composeRequest = function (method, url, data) {
        return {
            method: method,
            url: server + url,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
            },
            data: data
        }
    };

    var setUser = function(info) {
      currentUser.setLoggedInUser(info);
      return currentUser.getLoggedInUser();
    };

    return {

        setSelectedCircle: function (circle) {
            currentUser.setSelectedCircle(circle);
        },

        getBackgroundPage: function () {
            return backgroundPage;
        },

        getUserCircles: function () {
            var promiseForCircles = new Promise(function (resolve, reject) {
                resolve(currentUser.getLoggedInUser().myCircles)
            });
            
            return promiseForCircles;
        },

        registerUser: function(signUpInfo) {
            return $http(composeRequest('POST','/api/users', { nickname: signUpInfo.nickname, email: signUpInfo.email, password: signUpInfo.password }))
            .then(function (response) {
				var registeredUser = response.data.user;
				setUser(registeredUser);
				return registeredUser;
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        logInUser: function(info) {
            return $http(composeRequest('POST', '/login', { email: info.email, password: info.password }))
            .then(function (response) {

                /*
                chrome.cookies.get({ url: server, name: 'connect.sid' }, function (cookie) {
                        console.log('this is a cookie from logging in', cookie);
                        // chrome.runtime.sendMessage({cookie: cookie}, function(response) {
                        //     console.log('response from logInUser', response);
                        // })
                        // chrome.tabs.query({active:true, currentWindow: true}, function (tabs) {
                        //     chrome.tabs.sendMessage(tabs[0].id, {cookie: cookie}, function (response) {
                        //         console.log('response from logInUser', response);
                        //     })
                        // })
                        chrome.tabs.query({url: server + '/*'}, function (tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, {cookie: cookie}, function (response) {
                                console.log('response from logInUser', response);
                            })
                        })
                    })
                */

				var returnedUser = response.data.user;
				setUser(returnedUser);
				return returnedUser;
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        logOutUser: function() {
            return $http(composeRequest('GET', '/logout'))
            .then(function (response) {

                /*
                console.log('inside BackgroundFactory, after logout', response);
                chrome.cookies.get({ url: server, name: 'connect.sid' }, function (cookie) {
                    chrome.cookies.remove({ url: server, name: 'connect.sid' }, function (details) {
                        console.log('details', details)
                    });
                    console.log('this is a cookie from logging out', cookie);
                })
                */

                currentUser.setLogOutUser();
                return response.status;
            })
            .catch(function (err) {
                console.log(err);
            })
        },

        checkLoggedIn: function() {

            return $http(composeRequest('GET', '/session'))
            .then(function (response) {

                return response;
            })
            .catch(function (err) {
                console.log(err);
            })
        },

        isLoggedIn: function () {

        	return backgroundPage.user.isLoggedIn();
        }
    }
})