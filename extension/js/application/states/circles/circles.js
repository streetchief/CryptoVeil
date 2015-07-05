app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('circles', {
        url: '/circles',
        controller: 'circlesController',
        templateUrl: 'js/application/states/circles/circles.html'
    });

});

app.controller('circlesController', function ($scope, $modal, $log) {

$scope.oneAtATime = true;

  //userfactory.getmycircles.then
  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1',
      status: true,
      id: 24,
      members: ['member 1', 'member 2']
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2',
      status: false,
      id: 6,
      members: ['john', 'joe']
    }
  ];

  $scope.addMember = function(circleId) {
    $log.info('this is addMember',circleId);

      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'js/application/states/circles/addmembermodal/addmembertocirclemodal.html',
        controller: 'addMemberModalCtrl',
        size: 'sm'
        // resolve: {
        //   items: function () {
        //     return $scope.items;
        //   }
        // }
      }); // end modal open

    modalInstance.result.then(function (emailToAdd) {

      $log.info('recieved from modal',emailToAdd)
      
      $scope.groups.forEach(function (group) {

        if (group.id === circleId) {
          //FIXME -- save added member
          group.members.push(emailToAdd);
        };
      });

    })
    .then(null,  function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  }; // end $scope.addMember

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

});