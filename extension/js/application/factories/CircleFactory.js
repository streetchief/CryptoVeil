app.factory('CircleFactory', function($http) {

    var backgroundPage = chrome.extension.getBackgroundPage();
    var currentLoggedUser = backgroundPage.user.getLoggedInUser();
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

    return {
        // get user circle = background
        //create circle, update user too
        //get circle
        //update circle, for user remove, add
        //delete circle, updat user too
        //leave circle: get circle, delete user, update circle

        //CREATE CIRCLE
        createCircle: function(circleName) {
            return $http(composeRequest('POST', '/api/circles', {user:currentLoggedUser, 
                circleName: circleName
                }))
            .then(function(response){
                console.log('hit factory createcircle', response)
                return response.data;
            })
            .catch(function(err){
                console.log(err);
            })
        },

        deleteCircle: function(circleId) {
            return $http(composeRequest('DELETE', '/api/circles/' + circleId))
            .then(function (response) {
            	console.log('inside CircleFactory', response);
              return response.data;
            })
            .catch(function (err) {
              console.log(err);
            })
        }

        // registerUser: function(signUpInfo) {
        //     return $http(composeRequest('POST','/api/users', { nickname: signUpInfo.nickname, email: signUpInfo.email, password: signUpInfo.password }))
        //     .then(function (response) {
        //         var registeredUser = response.data.user;
        //         setUser(registeredUser);
        //         return registeredUser;
        //     })
        //     .catch(function (err) {
        //       console.log(err);
        //     })
        // },

        // logInUser: function(info) {
        //     return $http(composeRequest('POST', '/login', { email: info.email, password: info.password }))
        //     .then(function (response) {

        //         var returnedUser = response.data.user;
        //         setUser(returnedUser);
        //         return returnedUser;
        //     })
        //     .catch(function (err) {
        //       console.log(err);
        //     })
        // },


        // isLoggedIn: function () {

        // 	return backgroundPage.user.isLoggedIn();
        // }
    }
})