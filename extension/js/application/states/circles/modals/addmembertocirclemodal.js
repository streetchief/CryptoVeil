app.controller('addMemberModalCtrl', function ($scope, circleId, groups, $modalInstance, UserFactory, CircleFactory) {

  $scope.emailToAdd;
  $scope.showAlert = false;
  $scope.showEmailAlert = false;
  $scope.showInvalidAlert = false;

  $scope.ok = function () {
    UserFactory.checkUserByEmail($scope.emailToAdd)
    .then(function(res) {
      console.log('this is res!!!!!', res)        
        if(res === 'no user') return $scope.showInvalidAlert = true;      
        if(!$scope.emailToAdd) return $scope.showInvalidAlert = true;
        return CircleFactory.editMember(circleId, $scope.emailToAdd, 'add')
        .then(function(res) { 
            groups.forEach(function(group){
              $scope.emailToAdd.trim();
          		if(group._id.toString() === circleId) {
          			if(group.creator.email === $scope.emailToAdd) {
                  $scope.showEmailAlert = true;
          			} else if (group.members.length) {
                    group.members.forEach(function (member) {
                      if(member.email === $scope.emailToAdd){
        	  					    $scope.showAlert = true;
        	  				   }	  				
        	  			  })
          			  } else {
        	  			    $modalInstance.close($scope.emailToAdd);
        			      }
          		    }
          	 });
        })
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