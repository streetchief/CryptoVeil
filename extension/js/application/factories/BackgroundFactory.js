app.factory('BackgroundFactory', function($http) {

    var backgroundPage = chrome.extension.getBackgroundPage();
    var currentUser = backgroundPage.user;

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
            return $http.post('/api/users', { nickname: signUpInfo.nickname, email: signUpInfo.email, password: signUpInfo.password })
            .then(function (response) {
				var registeredUser = response.data.user;
				setUser(registeredUser);
				return registeredUser;
            });
        },

        logInUser: function(info) {
            return $http.post('/login', { email: info.email, password: info.password })
            .then(function (response) {
                chrome.tabs.query({title: 'CryptoVeil'}, function (tabs) {
                    if (tabs.length) {
                        tabs.forEach(function(tab) {
                            chrome.tabs.reload(tab.id)
                        });
                    };
                });

				var returnedUser = response.data.user;
				setUser(returnedUser);
				return returnedUser;
            });
        },

        logOutUser: function() {
            return $http.get('/logout')
            .then(function (response) {
                chrome.tabs.query({title: 'CryptoVeil'}, function (tabs) {
                    if (tabs) {
                        tabs.forEach(function(tab) {
                            chrome.tabs.reload(tab.id)
                        });
                    };
                });

                currentUser.setLogOutUser();
                return response.status;
            });
        },

        checkLoggedIn: function() {

            return $http.get('/session')
            .then(function (response) {

                return response.data;
            });
        },

        isLoggedIn: function () {

        	return backgroundPage.user.isLoggedIn();
        }
    }
})
