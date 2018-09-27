/**
* room directive
*/
directives.directive('floorPlanViewer',['FloorPlanService', function(FloorPlanService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/room-status-viewer-template.htm',
		link:
			function(scope, element, attrs){
				scope.value = {};				
				
				FloorPlanService.getFloorPlan().then(function(_result){
					scope.value.floors = _result.data;		
				});
				
				// set selected table cell row and column 
				scope.value.selectColour = function(_f){
					if(scope.value.selectedFloor==_f){
						return "grey";
					}else{
						return _f.colour;
					}
				}
				// set selected backtground color
				scope.value.changebgColor = function(_f){
					scope.value.selectedFloor = _f;
				}
				
				scope.value.getColour = function(obj){
					if(obj.status=='Reserved'){
						return "yellow";
					}
					return obj.colour;
				}
				
			}
	}
}]);

