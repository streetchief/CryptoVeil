app.factory('UserFactory', function ($http){
var server = 'http://localhost:1337'  
  // return {
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
  // };
});