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

