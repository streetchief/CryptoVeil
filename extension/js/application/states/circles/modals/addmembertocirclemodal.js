app.controller('addMemberModalCtrl', function ($scope, circleId, groups, $modalInstance, UserFactory, $log) {

  $scope.emailToAdd;
  $scope.showAlert = false;
  $scope.showEmailAlert = false;
  $scope.showInvalidAlert = false;

  function getCircleToAddTo (cId) {

    var result = groups.filter(function (group) {
      return group._id.toString() === cId;
    })

    return result[0];
  }

  $scope.ok = function () {

    var circleToAddTo,
      trimmedEmail;

    trimmedEmail = $scope.emailToAdd.trim();

    UserFactory.checkUserByEmail(trimmedEmail)
    .then(function (res) {

      if(res === 'no user') return $scope.showInvalidAlert = true;

      if(!$scope.emailToAdd || !trimmedEmail){
        return $scope.showInvalidAlert = true;
      }
      
      circleToAddTo = getCircleToAddTo(circleId);

      if(circleToAddTo.creator.email === trimmedEmail) {
        return $scope.showEmailAlert = true;
      }

      if (circleToAddTo.members.length) {

        circleToAddTo.members.forEach(function (member) {
          
          if(member.email === trimmedEmail){
            return $scope.showAlert = true;
          }            
        });
      }

      $modalInstance.close(trimmedEmail);

    })//end .then        
  }//end scope.ok

  $scope.closeAlert = function() {
    $scope.showAlert = false;
    $scope.showEmailAlert = false;
    $scope.showInvalidAlert = false;
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});