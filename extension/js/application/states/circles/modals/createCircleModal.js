app.controller('createCircleModalCtrl', function ($scope, $modalInstance, user) {
  $scope.user = user;
  $scope.showAlert = false;
  $scope.showNameAlert = false;
  $scope.circleName
  // var circleName;

function isValidName (nameToCheck) {
  return nameToCheck.search(/^[0-9a-zA-Z]+$/gim) !== -1;
}

  $scope.createCircle = function () {
	  if(!isValidName($scope.circleName)) {
	  	return $scope.showNameAlert = true;
	  }
	  else {
		  	$scope.user.myCircles.forEach(function(cir){

		  		if(cir.name.toUpperCase() === $scope.circleName.toUpperCase().trim()) $scope.showAlert = true;
          
        })
      console.log('hit modal close')
	    $modalInstance.close($scope.circleName);
	  }
  };

  $scope.closeAlert = function() {
    $scope.showAlert = false;
    $scope.showNameAlert = false;
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});