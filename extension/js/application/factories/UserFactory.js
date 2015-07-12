app.factory('UserFactory', function ($http, $log) {
    var server = 'http://127.0.0.1:1337';
    
    var composeRequest = function (method, url, data) {
        return {
            method: method,
            url: server + url,
            // headers: {
            //   'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //   'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
            // },
            data: data
        }
    };  

    return {

        checkUserByEmail: function(userEmail) {

            return $http(composeRequest('POST', '/api/users/checkEmail', {userEmail: userEmail}))
            .then(function (response){
                return response.data;
            })
        },

        checkUserByPassword: function(userPassword) {
            return $http(composeRequest('POST', '/api/users/checkPassword', {password: userPassword}))
            .then(function (response){
                return response.data;
            })
        },

        resetPassword: function(userPassword) {
            return $http(composeRequest('PUT', '/api/users/reset', {password: userPassword}))
            .then(function (response){
                return response.data;
            })
        },

        changeNickname: function(userNickname) {
            return $http(composeRequest('PUT', '/api/users/nickname', {nickname: userNickname}))
            .then(function (response){
                return response.data;
            })
        },

        promoteUser: function(userId) {
            // return $http(composeRequest('PUT', '/api/users/promote', {creator:}))
        },
         
        deleteAccount: function() {
            return $http(composeRequest('DELETE', '/api/users/'))
            .then(function (response) {
                return response.data;
            });
        }
      };
});