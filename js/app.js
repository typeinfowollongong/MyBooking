var directives = angular.module('app.directives', []);
var factories = angular.module('app.factories', []);
var app = angular.module('app', ['ngRoute', 'app.directives', 'app.factories']);

app.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.
	
		when('/viewRoomStatus', {
			templateUrl: 'view/viewRoomStatus.htm'
		}).	
	
		when('/viewFutureRoomStatus', {
			templateUrl: 'view/futureRoomStatusViewer.htm'
		}).			
		
		when('/registerBooking', {
			templateUrl: 'view/bookingEditor.htm'
		}).
		
		when('/searchBooking', {
			templateUrl: 'view/bookingViewer.htm'
		}).	
		
		when('/checkIn', {
			templateUrl: 'view/checkIn.htm'
		}).				
		
		when('/checkOut', {
			templateUrl: 'view/checkout.htm'
		}).		
		
		when('/roomStatusUpdate', {
			templateUrl: 'roomStatusUpdate.htm'
		}).	
		
		when('/searchCustomer', {
			templateUrl: 'searchCustomer.htm'
		}).	
		
		when('/searchRoom', {
			templateUrl: 'searchRoom.htm'
		}).	
		
		when('/registerCustomer', {
			templateUrl: 'view/customerEditor.htm'
		}).	
		
		when('/searchCustomer', {
			templateUrl: 'view/customerViewer.htm'
		}).	
		
		otherwise({
			redirectTo: '/viewRoomStatus'
		});
}]);

