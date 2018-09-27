/**
* Customer editor directive
*/
directives.directive('customerEditor',['CustomerService', function(CustomerService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/customer-editor-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.customer = {};
				
				function Customer(){
					var _self = {
						"id":"",
						"firstName":"",
						"lastName":"",
						"contactNumber":"",
						"email":"",
						"creditCardNumber":"",
						"creditCardExpiryDate":"",
						"creditCardCSV":"",
						"carRego":"",
						"address":""	
					};
					return _self;
				}				

				/**
				 * Action: to create a new customer
				 */
				scope.value.createCustomer = function() {
					scope.value.customer = {};
					scope.value.customer = new Customer();
				}	
	
				/**
				 * Action: To save new customer 
				 */
				scope.value.saveCustomer = function() {
					var obj = scope.value.customer;
					CustomerService.saveCustomer(obj).then(function(result){
						console.log(result);
					});
				}
					
			}
	}
}]);

/**
* Customer editor directive
*/
directives.directive('customerViewer',['CustomerService', function(CustomerService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/customer-viewer-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.disable = false;
				scope.value.customer = {};	
				scope.value.customers = {};				

				/**
				 * Retrieve all existing customers 
				 */
				CustomerService.getAllCustomers().then(function(result){
					//console.log(result);
					scope.value.customers = result.data;
				});
	
				/**
				 * Action: to edit existing customer
				 */				
				scope.value.editCustomer = function(obj) {
					scope.value.disable = false;
					//scope.value.customer = obj;
					scope.value.customer = {};
					scope.value.customer.id = obj.id;
					scope.value.customer.firstName = obj.firstName;
					scope.value.customer.lastName = obj.lastName;
					scope.value.customer.contactNumber = obj.contactNumber;
					scope.value.customer.email = obj.email;
					scope.value.customer.creditCardNumber = obj.creditCardNumber;
					scope.value.customer.creditCardExpiryDate = obj.creditCardExpiryDate;
					scope.value.customer.creditCardCSV = obj.creditCardCSV;
					scope.value.customer.carRego = obj.carRego;
					scope.value.customer.address = obj.address;
					/*scope.value.customer.branch = obj.carRego;
					scope.value.customer.refeem = obj.refeem;*/	
				}	
				
				scope.value.viewCustomer = function(obj) {
					scope.value.disable = true;	
					scope.value.customer = obj;
				}
				
				/**
				 * Action: To update existing customer 
				 */
				scope.value.updateCustomer = function() {
					var obj = scope.value.customer;
					CustomerService.updateCustomer(obj).then(function(result){
						console.log(result);
					});
				}					
			}
	}
}]);



/**
* Guest booking editor directive
*/
directives.directive('checkInEditor',['BookingService', function(BookingService, $scope, $location){
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
				scope.value.customer = {};
				scope.value.booking = {};
				scope.value.checkin = {};
				
				
				scope.newCustomer = {
					"id":"",
					"firstName":"",
					"lastName":"",
					"contactNumber":"",
					"email":"",
					"creditCardNumber":"",
					"creditCardExpiryDate":"",
					"creditCardCSV":"",
					"carRego":"",
					"address":"",
					"branch":"",	
					"refeem":""		
				};
				
				function Customer(){
					var _self = {
						"id":"",
						"firstName":"",
						"lastName":"",
						"contactNumber":"",
						"email":"",
						"creditCardNumber":"",
						"creditCardExpiryDate":"",
						"creditCardCSV":"",
						"carRego":"",
						"address":"",
						"branch":"",	
						"refeem":""		
					};
					return _self;
				}
				
				function Booking(){
					var _self = {
							"id":"",
							"customer":{},
							"bookingType":"Guest",
							"roomNumber":"",
							"dateOfArrive":"",
							"dateOfLeave":"",
							"breakfast":"",
							"dinner":"",
							"numberOfAdults":"1",
							"numberOfChildren":""		
						};
					return _self;
				}	
				
				function Checkin(){
					var _self = {
							"id":"",
							"customer":{},
							"roomNumber":"",
							"dateOfCheckin":"",
							"dateOfCheckout":"",
							"expectedDateOfLeave":"",
							"breakfast":"",
							"dinner":"",
							"numberOfAdults":"1",
							"numberOfChildren":""		
						};
					return _self;
				}	
				
				/**
				 * Retrieve all existing customers 
				 */
				BookingService.getAllCustomers().then(function(result){
					//console.log(result);
					scope.value.customers= result.data;
				});
				/**
				 * Action: to create a new customer
				 */
				scope.value.createCustomer = function() {
					scope.value.customer = scope.newCustomer;
				}	
				/**
				 * Action: to edit existing customer
				 */				
				scope.value.editCustomer = function(obj) {
					scope.value.customer = obj;
				}	
				/**
				 * Action: To save new customer or update existing customer 
				 */
				scope.value.saveOrUpdateCustomer = function() {
					var obj = scope.value.customer;
					if(obj.id===null){// save customer as new
						BookingService.saveCustomer(obj).then(function(result){
							console.log(result);
						});
					}else{ // update customer
						BookingService.updateCustomer(obj).then(function(result){
							console.log(result);
						});
					}
				}		
				
				/**
				 * Action: to create a new booking for selected customer
				 */
				scope.value.createBooking = function(obj) {
					var customer = obj;
					scope.value.booking = {};
					scope.value.booking = new Booking();
					scope.value.booking.customer = customer;
				}
				/**
				 * Action: To save new booking
				 */
				scope.value.saveOrUpdateBooking = function() {
					var obj = scope.value.booking;
					BookingService.saveBooking(obj).then(function(result){
						console.log(result);
					});
				}					
			}
	}
}]);


/**
* Guest booking editor directive
*/
directives.directive('bookingEditor',['BookingService', function(BookingService, $scope, $location){
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
				scope.value.booking = {};
				
				scope.newCustomer = {
					"id":"",
					"firstName":"",
					"lastName":"",
					"contactNumber":"",
					"email":"",
					"creditCardNumber":"",
					"creditCardExpiryDate":"",
					"creditCardCSV":"",
					"carRego":"",
					"address":"",
					"branch":"",	
					"refeem":""		
				};
				
				function Booking(){
					var _self = {
							"id":"",
							"customer":{},
							"bookingType":"Guest",
							"roomNumber":"",
							"dateOfArrive":"",
							"dateOfLeave":"",
							"breakfast":"",
							"dinner":"",
							"numberOfAdults":"1",
							"numberOfChildren":""		
						};
					return _self;
				}
				
				scope.newBooking = {
						"id":"",
						"customer":{},
						"bookingType":"Guest",
						"roomNumber":"",
						"dateOfArrive":"",
						"dateOfLeave":"",
						"breakfast":"",
						"dinner":"",
						"numberOfAdults":"1",
						"numberOfChildren":""		
					};				
				
				/**
				 * Retrieve all existing customers 
				 */
				BookingService.getAllCustomers().then(function(result){
					//console.log(result);
					scope.value.customers= result.data;
				});
				/**
				 * Action: to create a new customer
				 */
				scope.value.createCustomer = function() {
					scope.value.customer = scope.newCustomer;
				}	
				/**
				 * Action: to edit existing customer
				 */				
				scope.value.editCustomer = function(obj) {
					scope.value.customer = obj;
				}	
				/**
				 * Action: To save new customer or update existing customer 
				 */
				scope.value.saveOrUpdateCustomer = function() {
					var obj = scope.value.customer;
					if(obj.id===null){// save customer as new
						BookingService.saveCustomer(obj).then(function(result){
							console.log(result);
						});
					}else{ // update customer
						BookingService.updateCustomer(obj).then(function(result){
							console.log(result);
						});
					}
				}		
				
				/**
				 * Action: to create a new booking for selected customer
				 */
				scope.value.createBooking = function(obj) {
					var customer = obj;
					scope.value.booking = {};
					scope.value.booking = new Booking();
					scope.value.booking.customer = customer;
				}
				/**
				 * Action: To save new booking
				 */
				scope.value.saveOrUpdateBooking = function() {
					var obj = scope.value.booking;
					BookingService.saveBooking(obj).then(function(result){
						console.log(result);
					});
				}					
			}
	}
}]);


/**
* timesheet editor directive
*/
directives.directive('timesheetEditor',['TimesheetService', function(TimesheetService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:
			{value : '='},
		templateUrl:
			'view/template/timesheet-editor-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.timesheet = {};

				TimesheetService.getCurrent().then(function(result){
					scope.value.timesheet.currentWeek = result.data;
				});

				scope.value.timesheet.edit = function(data) {
					scope.value.timesheet.currentDay = data;
				}
				/*
				scope.value.timesheet.save = function(data) {
					TimesheetService.save(data).then(function(result){
						scope.value.timesheet.current = result.data;
					});
				}
				*/
			}
	}
}]);


/**
* Timesheet viewer directive
*/
directives.directive('timesheetViewer', ['TimesheetService', function(TimesheetService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:
			{value : '='},
		templateUrl:
			'view/template/timesheet-viewer-template.htm',
		link:
			function(scope, element, attrs){

				scope.value = {};
				scope.value.timesheet = {};

				TimesheetService.getWeeklySheets().then(function(result){
					scope.value.timesheet.weeklySheets = result.data;
				});

				scope.value.timesheet.getDailySheets = function(obj) {
					scope.value.timesheet.searchByReferenceNo = obj;
					TimesheetService.getDailySheets().then(function(result){
						scope.value.timesheet.dailySheets = result.data;
					});
				}

			}
	}
}]);
