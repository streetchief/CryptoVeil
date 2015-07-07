app.controller('createCircleModalCtrl', function ($scope, $modalInstance) {

  $scope.circleName;

  $scope.createCircle = function () {
    $modalInstance.close($scope.circleName);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});