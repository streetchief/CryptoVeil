app.controller('createCircleModalCtrl', function ($scope, $modalInstance, user) {
  $scope.user = user;
  $scope.showAlert = false;
  $scope.showNameAlert = false;
  $scope.circleName
  // var circleName;

  function isValidName (nameToCheck) {
    return nameToCheck.search(/^[0-9a-zA-Z]+$/gim) !== -1;
  }

  function checkNameExists(circlesArray, nameForNewCircle) {

    var nameIsDuplicate;

    nameForNewCircle = nameForNewCircle.toUpperCase().trim();

    circlesArray.forEach(function (circle){
      var cleanName;

      cleanName = circle.name.toUpperCase().trim();

      if (cleanName === nameForNewCircle) {
        nameIsDuplicate = true;
      }
    });

    return !!nameIsDuplicate;
  }//end checkNameExists

  $scope.createCircle = function () {
	  if(!isValidName($scope.circleName)) {
	  	return $scope.showNameAlert = true;
	  }

    if (checkNameExists(user.myCircles, $scope.circleName)) {
      return $scope.showAlert = true;
    };

    $modalInstance.close($scope.circleName);
  };

  $scope.closeAlert = function() {
    $scope.showAlert = false;
    $scope.showNameAlert = false;
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});