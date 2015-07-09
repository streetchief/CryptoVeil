app.controller('addMemberModalCtrl', function ($scope, circleId, groups, $modalInstance, CircleFactory) {

  $scope.emailToAdd;
  $scope.showAlert = false;
  $scope.showEmailAlert = false;
  $scope.showInvalidAlert = false;

  $scope.ok = function () {
  	console.log('try duplicate user', )
  	CircleFactory.editMember(circleId, $scope.emailToAdd, 'add')
  	.then(function(res){
  		if(res === 'no user'){ return $scope.showInvalidAlert = true;
  		console.log('this is duplicate res', res)
  }else{
  	// if(!CircleFactory.editMember(circleId, $scope.emailToAdd, 'add')) return $scope.showInvalidAlert = true; 
  	if(!$scope.emailToAdd) return $scope.showInvalidAlert = true;
  	groups.forEach(function(group){
	  	$scope.emailToAdd.trim();
  		//single group
  		if(group._id.toString() === circleId){
  			console.log('match group', group.creator, circleId)
  			if(group.creator.email === $scope.emailToAdd){
  				console.log('in the if block', group.creator.email === $scope.emailToAdd)
  				console.log('$scope.showEmailAlert', $scope.showEmailAlert)
  				$scope.showEmailAlert = true;
  			} else if (group.members.length) {
  				console.log('in the else block')
  				console.log('this is the group', group)
	  			group.members.forEach(function(member){
	  				if(member.email === $scope.emailToAdd){
	  					$scope.showAlert = true;
	  				}	  				
	  			})
  			}
			else {
	  			$modalInstance.close($scope.emailToAdd);
			}
  		}
  	});
  }
  	})
}

  $scope.closeAlert = function() {
    $scope.showAlert = false;
    $scope.showEmailAlert = false;
    $scope.showInvalidAlert = false;
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});