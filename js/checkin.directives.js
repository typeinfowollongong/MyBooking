/**
* Guest booking editor directive
*/
directives.directive('checkInEditor',['BookingService', 'CustomerService', 'ReferenceDataService', 'CheckinService', function(BookingService, CustomerService, ReferenceDataService, CheckinService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/check-in-editor-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.checkin = {};
				scope.value.search = {};
				scope.value.bookingTypes = {};
				
				
				scope.value.init = function(){
					scope.value.customer = {};
					scope.value.checkin = new Checkin();
					scope.value.search.customers = {};
					scope.value.search.bookings = {};
					scope.value.selectedBooking = {};
					scope.value.selectedCustomer = {};
				}
				
				scope.value.init();

				/**
				 * Retrieve all booking types
				 * Populate bookingType dropdown list
				 */
				ReferenceDataService.getAllBookingType().then(function(result){
					scope.value.bookingTypes = result.data;					
				});	
								
				/**
				 * Action: To save new Checkin
				 */
				scope.value.saveCheckIn = function(){
					scope.value.checkin.bookingType.id = scope.value.selectedBookingType.id;
					CheckinService.saveCheckin(scope.value.checkin).then(function(result){
						console.log(result);
						scope.value.checkin.id = result.data;
						Alert("CHECK-IN: checkin successfully!");
						init();
					});
					
					/*
					scope.value.checkin.bookingType.id = scope.value.selectedBookingType.id;
					
					if(scope.value.customer.id==""){
						CustomerService.saveCustomer(scope.value.customer).then(function(result){
							console.log(result);
							scope.value.customer.id = result.data;
							scope.value.checkin.customer.id = result.data;

							CheckinService.saveCheckin(scope.value.checkin).then(function(result){
								console.log(result);
								scope.value.checkin.id = result.data;
							});
						});
					}else{
						CustomerService.updateCustomer(obj).then(function(result){
							console.log(result);
							
							CheckinService.saveCheckin(scope.value.checkin).then(function(result){
								console.log(result);
								scope.value.checkin.id = result.data;
							});
						});
					}
					*/
				}
				
				/**
				 * 
				 */
				scope.value.searchCustomerByFirstName = function(str){
					var criteria = {"first_name" : str};
					searchCustomer(criteria);
				}
				
				scope.value.searchCustomerByLastName = function(str){					
					var criteria = {"last_name" : str};
					searchCustomer(criteria);
				}		
				
				scope.value.searchCustomerByContactNumber = function(str){					
					var criteria = {"contact_number" : str};
					searchCustomer(criteria);
				}	
				
				scope.value.searchCustomerByEmail = function(str){					
					var criteria = {"email" : str};
					searchCustomer(criteria);
				}	
				
				function searchCustomer(criteria){
					CustomerService.searchCustomers(criteria).then(function(result){
						console.log(result);
						scope.value.search.customers = result.data;
					});
				}
				/**
				 * 
				 */
				scope.value.selectCustomer = function(obj){	
					scope.value.selectedCustomer = obj;
					scope.value.customer = scope.value.selectedCustomer;
					scope.value.checkin.customer.id = scope.value.selectedCustomer.id
					var criteria = {"customerId" : obj.id};
					searchBookings(criteria);
				}	
				
				function searchBookings(criteria){
					BookingService.searchBookings(criteria).then(function(result){
						console.log(result);
						scope.value.search.bookings = result.data;
					});
				}
				
				
				/**
				 * Action: to set booking 
				 */							
				scope.value.selectBooking = function(obj) {
					scope.value.selectedBooking = obj;
					scope.value.checkin = new Checkin();
					scope.value.checkin.customer.id = scope.value.selectedCustomer.id
					scope.value.checkin.roomNumber = obj.roomNumber;
					scope.value.checkin.price = obj.price;
					scope.value.checkin.breakfast = obj.breakfast=="0" ? false : true;
					scope.value.checkin.dinner = obj.dinner=="0" ? false : true;
					scope.value.checkin.numberOfChildren = obj.numberOfChildren;
					scope.value.checkin.numberOfAdults = obj.numberOfAdults;
					scope.value.checkin.isConfirmed = obj.isConfirmed=="0" ? false : true;
					scope.value.checkin.branch = obj.branch;
					scope.value.checkin.refeem = obj.refeem;
					// Setting booking type dropdown list
					scope.value.selectedBookingType = scope.value.bookingTypes.filter(function(e){
						return e.id = obj.booking_type_id;
					})[0];
					//
					scope.value.checkin.expectedDateOfLeave = dateToStr(obj.dateOfArrive); //common.js
				}	
				
				/**
				 * 
				 */
			}
	}
}]);

