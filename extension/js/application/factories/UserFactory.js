app.factory('UserFactory', function ($http) {
    // var backgroundPage = chrome.extension.getBackgroundPage();
    // var currentLoggedUser = backgroundPage.user.getLoggedInUser();
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

        checkUserByEmail: function(userEmail) {
            return $http(composeRequest('GET', '/api/users/' + userEmail))
            .then(function(response){
                console.log('checkUserByEmail response', response)
                return response.data;
            })
        },
        resetPassword: function(userEmail) {
            return $http(composeRequest('PUT', '/api/users/reset'))
            .then(function(response){
                console.log('resetPassword response', response)
                return response.data;
            })
        },
        changeNickname: function(userEmail) {
            return $http(composeRequest('PUT', '/api/users/nickname'))
            .then(function(response){
                console.log('changeNickname response', response)
                return response.data;
            })
        }        
  //   getAllUsers: function (){
  //     return $http.get("/users")
  //     .then(function (response){
  //       return response.data;
  //     });
  //   },
  //   getUserById: function (id) {
  //     return $http.get("/users/" + id)
  //     .then(function (response) {
  //       return response.data;
  //     });
  //   },
  //   getUserByEmail: function (email) {
  //     return $http.get('/users/email/' + email)
  //     .then(function (response) {
  //       return response.data;
  //     });
  //   },
  //   createUser: function (user) {
  //     return $http.post("/signup", user)
  //     .then(function (response) {
  //       return response.data;
  //     });
  //   },
  //   putOrderOnUser: function (id, info) {
  //     return $http.put('/orderonuser/' + id, {_id: info})
  //     .then(function (response) {
  //       return response.data;
  //     });
  //   },
  //   promoteUserStatus: function (id, info) {
  //     return $http.put('/promote/' + id, info)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //   },
  //   resetUserPassword: function (id, info) {
  //     return $http.put('/reset/' + id, info)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //   },
  //   triggerReset: function (email, info) {
  //     return $http.put('/reset/trigger/'+email, info)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //   },
  //   deleteUserById: function (id) {
  //     return $http.delete('/delete/' + id);
  //   }
      };
});