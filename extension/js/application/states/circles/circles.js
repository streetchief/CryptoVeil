app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('circles', {
        url: '/circles',
        controller: 'circlesController',
        templateUrl: 'js/application/states/circles/circles.html'
    });

});

app.controller('circlesController', function ($scope) {

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
    console.log('this is addMember',circleId);
    // var newItemNo = Math.random()
    // $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

});