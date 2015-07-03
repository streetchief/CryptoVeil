app.directive('hamburger', function ($rootScope, $state) {
	
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/js/application/directives/hamburger/hamburger.html',
		link: function (scope) {

		    scope.items = [
		        { label: 'Home', state: 'home' },
		        { label: 'Manage Circles', state: 'circles' },
		        { label: 'Account Management', state: 'account' },
		        { label: 'Logout', state: 'register' }
		    ];

		    scope.msg = 'sup';
		}
	};
});