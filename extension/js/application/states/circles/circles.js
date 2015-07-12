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
$scope.groups = {};

BackgroundFactory.checkLoggedIn()
.then(function (response) {
  return $scope.user = response.user;
})
.then(function (user) {

  BackgroundFactory.getUserCircles()
  .then(function (circlesInfo) {
    var own = [], part = [];

    for(var i = 0; i < circlesInfo.length; i++){
      if(circlesInfo[i].creator._id === $scope.user._id) own.push(circlesInfo[i])
      else part.push(circlesInfo[i]);
    }
    $scope.groups.owned = own;

    return part;
  })
  .then(function(partCircle){
    partCircle.forEach(function(circle){
      for(var i=0; i<circle.members.length; i++){
        if(circle.members[i]._id === $scope.user._id){
          circle.members.splice(i,1)
        }
      }
    })
    return $scope.groups.part = partCircle;
  }) 
})
.then(null, function(err){
  throw new Error('Error retrieving user and group data from factory')
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

        return $scope.groups.owned.unshift(res);
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
          for(var i=0; i<$scope.groups.owned.length; i++){
            if($scope.groups.owned[i]._id === circleId) $scope.groups.owned.splice(i,1);
          }     
      }) 
      .then(null,  function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
  })
}; // end $scope.deleteCircle

/*****************************************/
  $scope.addMember = function(circleId) {

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
            return $scope.groups.owned;
          }
        }
      }); // end modal open

    modalInstance.result.then(function (memberEmail) {

      CircleFactory.editMember(circleId, memberEmail, 'add')
      .then(function (newMember){

        $scope.groups.owned.forEach(function (group) {
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
        for(var i=0; i<$scope.groups.owned.length; i++){
          if($scope.groups.owned[i]._id === circleId){
            for(var j=0; j<$scope.groups.owned[i].members.length; j++){
              if($scope.groups.owned[i].members[j]._id === newMember._id){
                $scope.groups.owned[i].members.splice(j,1);
              }
            }
          }
        }
        
      })
  }

/*************************************/
  $scope.leaveCircle = function(circleId) {

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

  //   modalInstance.result.then(function (circleId) {
  //     CircleFactory.deleteCircle(circleId)
  //     .then(function(stat){
  //         $log.info('recieved from modal',circleId)
  //         for(var i=0; i<$scope.groups.owned.length; i++){
  //           if($scope.groups.owned[i]._id === circleId) $scope.groups.owned.splice(i,1);
  //         }     
  //     }) 
  //     .then(null,  function () {
  //       $log.info('Modal dismissed at: ' + new Date());
  //     });
  // })
}; // end $scope.deleteCircle

});