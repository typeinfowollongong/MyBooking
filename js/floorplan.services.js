
/**
* Checkin service
*/
factories.factory('FloorPlanService', function($http){
	return {
		
		getFutureFloorPlan: function() {
			console.log("SERVICE: calling all rooms...");
			return $http.get('json/futurefloorplan.json');
		},	
		
		getFloorPlan: function() {
			console.log("SERVICE: calling all rooms...");
			return $http.get('json/floorplan.json');
		},			
		
		getAllRooms: function() {
			console.log("SERVICE: calling rooms...");
			return $http.get('json/rooms.json');
		},	
	};
});
