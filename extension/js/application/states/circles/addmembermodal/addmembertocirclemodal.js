app.controller('addMemberModalCtrl', function ($scope, $modalInstance) {

  $scope.emailToSearch;

  $scope.ok = function () {
    $modalInstance.close($scope.emailToSearch);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});