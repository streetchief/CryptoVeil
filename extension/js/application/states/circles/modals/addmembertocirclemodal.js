app.controller('addMemberModalCtrl', function ($scope, $modalInstance) {

  $scope.memberToAdd;

  $scope.ok = function () {
    $modalInstance.close($scope.memberToAdd);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});