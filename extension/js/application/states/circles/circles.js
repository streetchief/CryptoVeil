app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('circles', {
        url: '/circles',
        controller: 'circlesController',
        templateUrl: 'js/application/states/circles/circles.html'
    });

});

app.controller('circlesController', function ($scope, $modal, $log, CircleFactory, BackgroundFactory) {

$scope.oneAtATime = true;
// $scope.groups

BackgroundFactory.getUserCircles().then(function(circlesInfo){
  $scope.groups = circlesInfo;
  console.log('this is circles', $scope.groups)
})
BackgroundFactory.checkLoggedIn().then(function(response){
  $scope.user = response.user;
  $log.info('this is user on circle.js', $scope.user);
})

/*******************************/

  $scope.createCircle = function() {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'js/application/states/circles/modals/createCircleModal.html',
        controller: 'createCircleModalCtrl',
        size: 'sm',
        resolve: {
          user: function () {
            return $scope.user;
          }
        }
      }); // end modal open

    modalInstance.result.then(function (circleName) {
      CircleFactory.createCircle(circleName)
      .then(function(res){
        $log.info('hit modal createcircle', res)
        $scope.groups.unshift(res);
      })
      .then(null, function(err){
        $log.info('Modal dismissed at: ' + new Date());
      })
    });

  }; // end $scope.createCircle

/*************************************/
  $scope.deleteCircle = function(circleId) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'js/application/states/circles/modals/deleteCircleModal.html',
      controller: 'deleteCircleModalCtrl',
      size: 'sm',
      resolve: {
          circleId: function () {
            return circleId;
          }
        }
    }); // end modal open

    modalInstance.result.then(function (circleId) {
      CircleFactory.deleteCircle(circleId)
      .then(function(stat){
          $log.info('recieved from modal',circleId)
          for(var i=0; i<$scope.groups.length; i++){
            if($scope.groups[i]._id === circleId) $scope.groups.splice(i,1);
          }     
      }) 
      .then(null,  function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
  })
}; // end $scope.deleteCircle

/*****************************************/
  $scope.addMember = function(circleId) {
    $log.info('this is addMember',circleId);

      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'js/application/states/circles/modals/addmembertocirclemodal.html',
        controller: 'addMemberModalCtrl',
        size: 'sm',
        resolve: {
          circleId: function () {
            return circleId;
          },
          groups: function(){
            return $scope.groups;
          }
        }
      }); // end modal open

    modalInstance.result.then(function (memberEmail) {
      CircleFactory.editMember(circleId, memberEmail, 'add')
      .then(function(newMember){
        $scope.groups.forEach(function (group) {
          if (group._id.toString() === circleId) {
            group.members.push(newMember)
          };
        }); 
      })
    })
    .then(null,  function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }; // end $scope.addMember

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

/*******************************/

  $scope.deleteMemb = false;
  $scope.showDelete = function(){
    if($scope.deleteMemb === false)
      $scope.deleteMemb = true;
    else
      $scope.deleteMemb = false;
  }

  $scope.deleteMember = function(circleId, memEmail){
    CircleFactory.editMember(circleId, memEmail, 'delete')
      .then(function(newMember){
        for(var i=0; i<$scope.groups.length; i++){
          if($scope.groups[i]._id === circleId){
            for(var j=0; j<$scope.groups[i].members.length; j++){
              if($scope.groups[i].members[j]._id === newMember._id){
                $scope.groups[i].members.splice(j,1);
              }
            }
          }
        }
        
      })
  }

});