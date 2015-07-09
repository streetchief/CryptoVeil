app.controller('deleteCircleModalCtrl', function($scope, circleId, $modalInstance) {
  // console.log('hit modal controller',product)

  $scope.showAlert=true;

  $scope.ok = function () {
  	// console.log($scope.circleId)
    $scope.showAlert=false;
    $modalInstance.close(circleId);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
