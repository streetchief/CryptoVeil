app.controller('deleteCircleModalCtrl', function($scope, circleId, $modalInstance) {
  // console.log('hit modal controller',product)

  $scope.showAlert=true;
  $scope.circleId = circleId

  $scope.ok = function () {
  	// console.log($scope.circleId)
    $scope.showAlert=false;
    $modalInstance.close($scope.circleId = circleId);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
