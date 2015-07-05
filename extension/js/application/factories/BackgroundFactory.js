app.factory('BackgroundFactory', function($http) {

    var backgroundPage = chrome.extension.getBackgroundPage();
    var test = backgroundPage.user;
    
    var request = function (method, url, data) {
        return {
            method: method,
            url: url,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
            },
            data: data
        }
    }

    return {
        setUser: function(info) {
          test.setLoggedInUser(info);
          return test.getLoggedInUser();
        },

        setUserToNull: function() {
          test.setLogOutUser();
        },

        registerUser: function(signUpInfo) {
            return $http(request('POST','http://127.0.0.1:1337/api/users', { nickname: signUpInfo.nickname, email: signUpInfo.email, password: signUpInfo.password }))
            .then(function (response) {
              return response.data;
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        logInUser: function(info) {
            return $http(request('POST', 'http://127.0.0.1:1337/login', { email: info.email, password: info.password }))
            .then(function (response) {
              return response.data;
            })
            .catch(function (err) {
              console.log(err);
            })
        },

        logOutUser: function() {
            return $http(request('GET', 'http://127.0.0.1:1337/logout'))
            .then(function (response) {
              return response.data;
            })
            .catch(function (err) {
              console.log(err);
            })
        }
    }
})