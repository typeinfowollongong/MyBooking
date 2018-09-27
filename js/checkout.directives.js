/**
* Guest booking editor directive
*/
directives.directive('checkOutEditor',['BookingService', 'CustomerService', 'ReferenceDataService', 'CheckinService', function(BookingService, CustomerService, ReferenceDataService, CheckinService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/checkout-editor-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.checkin = {};
				scope.value.search = {};
				scope.value.bookingTypes = {};

				scope.value.checkin = new Checkin();
				scope.value.search.customers = {};
				scope.value.search.bookings = {};
				scope.value.selectedBooking = {};
				scope.value.selectedCustomer = {};				

				/**
				 * Retrieve all booking types
				 * Populate bookingType dropdown list
				 */
				ReferenceDataService.getAllBookingType().then(function(result){
					scope.value.bookingTypes = result.data;					
				});	
								
				/**
				 * Action: To checkout
				 */
				scope.value.checkout = function(){
					checkout = {"id":scope.value.checkin.id, "dateOfCheckout":scope.value.checkin.dateOfCheckout};
					CheckinService.checkout(checkout).then(function(result){
						console.log(result);
						Alert("CHECK-IN: checkin successfully!");
					});
					
				}
				
				
				function searchCustomer(criteria){
					CustomerService.searchCustomers(criteria).then(function(result){
						console.log(result);
						scope.value.checkin.customer = result.data[0];
					});
				}

				/**
				 * Checkin Search
				 */
				scope.value.searchCheckinByRoom = function(str){					
					var criteria = {"room_number" : str, "status":"A"};
					searchCheckin(criteria);
				}	
				
				function searchCheckin(criteria){
					CheckinService.searchCheckin(criteria).then(function(result){
						console.log(result);
						var obj = result.data[0];
						scope.value.checkin = new Checkin(obj);
						criteria = {"id" : scope.value.checkin.customer.id};
						searchCustomer(criteria);	
						searchBookingTypeById(scope.value.checkin.bookingType.id);
						scope.value.checkin.dateOfCheckout = dateToStr(new Date()); //common.js
					});
				}
				
				function searchBookingTypeById(id){
					scope.value.selectedBookingType = scope.value.bookingTypes.filter(function(e){
						return e.id = id;
					})[0];
				}
				
				/**
				 * 
				 */
			}
	}
}]);

