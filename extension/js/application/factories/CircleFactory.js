app.factory('CircleFactory', function ($http, $log) {

    var backgroundPage = chrome.extension.getBackgroundPage();
    var currentLoggedUser = backgroundPage.user.getLoggedInUser();
    var server = 'http://127.0.0.1:1337';
    var clog = $log.info;
    
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

        //CREATE CIRCLE
        createCircle: function(circleName) {
            return $http(composeRequest('POST', '/api/circles', {user:currentLoggedUser, 
                circleName: circleName
                }))
            .then(function(response){
                return response.data;
            })
        },

        deleteCircle: function(circleId) {
            return $http(composeRequest('DELETE', '/api/circles/' + circleId))
            .then(function (response) {
              return response.data;
            });
        },

        editMember: function(circleId, memberEmail, edit){
            // edit is add or delete
            clog('circleId', circleId, 'email', memberEmail, 'command', edit);

            var options = {newEmail: memberEmail, edit: edit};

            return $http(composeRequest('PUT', '/api/circles/' + circleId, options))
            .then(function (response) {
                clog('inside circlefactory.editMember response',response)
                return response.data;
            });
        }


    }
})