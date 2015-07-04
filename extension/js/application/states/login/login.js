app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/',
        controller: 'loginController',
        templateUrl: 'js/application/states/login/login.html'
    });

});

app.controller('loginController', function ($scope, $http, AuthService, BackgroundFactory, $state, $window, $location) {
    $scope.login = {};
    $scope.error = null;

    // function httpCall(method, data){
    //     var req = {
    //      method: method, //'POST'
    //      url: 'http://127.0.0.1:1337/login',
    //      headers: {
    //        'Content-Type': 'application/json'
    //      },
    //      data: { userData: data }
    //     }

    //     return $http(req);
    // }

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        var req = {
         method: 'POST', //'POST'
         url: 'http://127.0.0.1:1337/login',
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        },
         data: { userData: loginInfo }
        }

        $http(req)
        .then(function(userInfo) {
            console.log('this is userInfo', userInfo)
        }) //$http.jsonp(req)
        .catch(function(err) {
            console.log(err);
        })
        console.log('this is loginInfo', loginInfo);
        // httpCall('POST', loginInfo).then(function (userData) {
        //     // console.log('hello', Session.user)
        //     console.log('hit longinController', userData);

        //     // if (Session.user.reset === true) $state.go('resetPw')

        //     // else $state.go('home');
        //     // $location.href="http://localhost:1337/discover"
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });
    };

    $scope.redirectLogin = function(location){
      // console.log('oauth', location)
      // $window.location.href = "/auth/" + location;
        // $state.go('discover');
    };
});