/**
* Regference data service
*/
factories.factory('ReferenceDataService', function($http){
	return {

		getAllBookingType: function() {
			console.log("SERVICE: calling getting all booking type ...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewReferenceData.php',
				data 		: {'reference_data':'bookingType'},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},
		
	};
});


/**
* Customer service
*/
factories.factory('CustomerService', function($http){
	return {

		getAllCustomers: function() {
			console.log("SERVICE: calling customers...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewCustomer.php',
				data 		: {},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},

		searchCustomers: function(obj) {
			console.log("SERVICE: calling customers...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewCustomer.php',
				data 		: {"search_criteria":obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},		
		
		saveCustomer: function(obj) {
			console.log("SERVICE: calling save customer...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCustomer.php',
				data	: obj,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				//return data;
			})
			.error(function(){

			});
		},
		
		updateCustomer: function(obj) {
			console.log("SERVICE: calling update customer...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCustomer.php',
				data	: obj,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				//return data;
			})
			.error(function(){

			});
		}
	};
});

/**
* Booking service
*/
factories.factory('BookingService', function($http){
	return {
		saveBooking: function(obj) {
			console.log("SERVICE: calling save booking...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitBooking.php',
				data	: {'action':'insert', 'data':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},
		
		getAllBookings: function() {
			console.log("SERVICE: calling all bookings...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewBooking.php',
				data 		: {},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},		
		
		searchBookings: function(obj) {
			console.log("SERVICE: calling search booking...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewBooking.php',
				data 		: {"search_criteria":obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});
		},	
		
		updateBooking: function(obj) {
			console.log("SERVICE: calling update booking...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitBooking.php',
				data	: {'action':'update', 'data':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				//return data;
			})
			.error(function(){

			});
		},
		
		cancelBooking: function(id) {
			console.log("SERVICE: calling update booking...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitBooking.php',
				data	: {'action':'cancel', 'id':id},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
				console.log(data);
				//return data;
			})
			.error(function(){

			});
		}		
		
	};
});


/**
* Checkin service
*/
factories.factory('CheckinService', function($http){
	return {
		saveCheckin: function(obj) {
			console.log("SERVICE: calling save checkin...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCheckin.php',
				data	: {'action':'insert', 'data':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		},
		
		getAllCheckin: function() {
			console.log("SERVICE: calling all checkin...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/ViewCheckin.php',
				data 		: {},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		},		
		
		searchCheckin: function(obj) {
			console.log("SERVICE: calling search checkin...");
			
			return $http({
				method	:	'POST',
				url 		: 'php/SubmitCheckin.php',
				data 		: {'action':'search', 'criteria':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		},	
		
		updateCheckin: function(obj) {
			console.log("SERVICE: calling update checkin...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCheckin.php',
				data	: {'action':'update', 'data':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		},
		
		checkout: function(obj) {
			console.log("SERVICE: calling checkout...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCheckin.php',
				data	: {'action':'checkout', 'data':obj},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		},
		
		cancelCheckin: function(id) {
			console.log("SERVICE: calling update booking...");
			return $http({
				method	: 'POST',
				url 	: 'php/SubmitCheckin.php',
				data	: {'action':'cancel', 'id':id},
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(result) {
				console.log(result.data);
				return result.data;
			})
			.error(function(){

			});
		}		
		
	};
});
