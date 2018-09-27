/**
* booking editor directive
*/
directives.directive('bookingEditor',['BookingService', 'CustomerService', 'ReferenceDataService', function(BookingService, CustomerService, ReferenceDataService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/booking-editor-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.customer = {};
				scope.value.booking = new Booking();
				scope.value.bookingTypes = {};
				scope.value.search = {};
				scope.value.search.customers = {};
				scope.value.selectedCustomer = {};
				
				/**
				 * Retrieve all booking types
				 */
				ReferenceDataService.getAllBookingType().then(function(result){
					scope.value.bookingTypes = result.data;
					
				});				
				
				/**
				 * Retrieve all existing customers 
				 */
				CustomerService.getAllCustomers().then(function(result){
					//console.log(result);
					scope.value.customers= result.data;
				});
				
				/**
				 * 
				 */
				scope.value.selectCustomer = function(obj){
					scope.value.customer = new Customer();
					scope.value.customer = obj;
				}
				
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
				 * Action: to reset all fields of booking
				 */
				scope.value.resetBooking = function() {
					scope.value.booking = new Booking();
					value.selectedBookingType = {};
				}
				/**
				 * Action: To save new booking
				 */
				scope.value.saveBooking = function() {
					var newBooking = new Booking();
					newBooking.customer.id = scope.value.customer.id;
					newBooking.bookingType.id = scope.value.selectedBookingType.id;
					newBooking.roomNumber = scope.value.booking.roomNumber;
					newBooking.dateOfArrive = scope.value.booking.dateOfArrive;
					newBooking.dateOfLeave = scope.value.booking.dateOfLeave;
					newBooking.price = scope.value.booking.price;
					newBooking.breakfast = scope.value.booking.breakfast;
					newBooking.dinner = scope.value.booking.dinner;
					newBooking.numberOfAdults = scope.value.booking.numberOfAdults;
					newBooking.numberOfChildren = scope.value.booking.numberOfChildren;
					newBooking.isConfirmed = scope.value.booking.isConfirmed;
					newBooking.branch = scope.value.booking.branch;
					newBooking.refeem = scope.value.booking.refeem;
					console.log(newBooking);
					BookingService.saveBooking(newBooking).then(function(result){
						console.log(result);
						alert('Booked...');
						scope.value.resetBooking();
					});
				}					
			}
	}
}]);

/**
* booking editor directive
*/
directives.directive('bookingViewer',['BookingService', 'CustomerService', 'ReferenceDataService', function(BookingService, CustomerService, ReferenceDataService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/booking-viewer-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.bookingTypes = {};
				scope.value.search = {};
				scope.value.search.bookings = {};
				scope.value.selectedbooking = {};
				
				/**
				 * Retrieve all booking types
				 */
				ReferenceDataService.getAllBookingType().then(function(result){
					scope.value.bookingTypes = result.data;
					
				});				

				/**
				 * Retrieve all existing bookings 
				 */
				scope.value.searchAllBookings = function(){
					BookingService.getAllBookings().then(function(result){
						//console.log(result);
						scope.value.search.bookings = result.data;
					});
				}
				
				scope.value.searchAllBookings();
				
				/**
				 * Action: to edit existing customer
				 */				
				scope.value.editBooking = function(obj) {
					scope.value.disable = false;
					scope.value.booking = new Booking();
	
					scope.value.booking.id = obj.id;
					//scope.value.booking.bookingTypeId = obj.booking_type_id;
					scope.value.booking.roomNumber = obj.roomNumber;
					//scope.value.booking.dateOfArrive = obj.dateOfArrive;
					//scope.value.booking.dateOfLeave = obj.dateOfLeave;
					scope.value.booking.price = obj.price;
					scope.value.booking.breakfast = obj.breakfast=="0" ? false : true;
					scope.value.booking.dinner = obj.dinner=="0" ? false : true;
					scope.value.booking.numberOfChildren = obj.numberOfChildren;
					scope.value.booking.numberOfAdults = obj.numberOfAdults;
					scope.value.booking.isConfirmed = obj.isConfirmed=="0" ? false : true;
					scope.value.booking.branch = obj.branch;
					scope.value.booking.refeem = obj.refeem;
					// Setting booking type dropdown list
					scope.value.selectedBookingType = scope.value.bookingTypes.filter(function(e){
						return e.id = obj.booking_type_id;
					})[0];
					//
					scope.value.booking.dateOfArrive = dateToStr(obj.dateOfArrive); //common.js
					scope.value.booking.dateOfLeave = dateToStr(obj.dateOfLeave); //common.js
				}	
				
				scope.value.viewBooking = function(obj) {
					scope.value.disable = true;	
					scope.value.customer = obj;
				}
				
				/**
				 * 
				 */
				scope.value.selectCustomer = function(obj){
					//scope.value.customer = new Customer();
					scope.value.selectedbooking = obj;
				}
				
				scope.value.searchBookingByFirstName = function(str){
					var criteria = {"firstName" : str};
					searchBookings(criteria);
				}
				
				scope.value.searchBookingByLastName = function(str){					
					var criteria = {"lastName" : str};
					searchBookings(criteria);
				}		
				
				scope.value.searchBookingByContactNumber = function(str){					
					var criteria = {"contactNumber" : str};
					searchBookings(criteria);
				}	
				
				scope.value.searchBookingByEmail = function(str){					
					var criteria = {"email" : str};
					searchBookings(criteria);
				}	
				
				function searchBookings(criteria){
					BookingService.searchBookings(criteria).then(function(result){
						console.log(result);
						scope.value.search.bookings = result.data;
					});
				}
								
				/**
				 * Action: To update existing booking 
				 */
				scope.value.updateBooking = function() {
					scope.value.booking.bookingType.id = scope.value.selectedBookingType.id;
					var obj = scope.value.booking;
			
					BookingService.updateBooking(obj).then(function(result){
						console.log(result);
						scope.value.searchAllBookings();
					});
				}			
				/**
				 * Action: To cancel booking
				 */
				scope.value.cancelBooking = function(bookingId){
					BookingService.cancelBooking(bookingId).then(function(result){
						console.log(result);
						scope.value.searchAllBookings();
					});
				}
			}
	}
}]);