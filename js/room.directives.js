/**
* room directive
*/
directives.directive('futureRoomViewer',['FloorPlanService', function(FloorPlanService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/future-room-viewer-template.htm',
		link:
			function(scope, element, attrs){
				scope.value = {};
				scope.value.months = monthsArray();
				scope.value.weeks = weeksArray();
				
				
				FloorPlanService.getFutureFloorPlan().then(function(_result){
					scope.value.floorplans = _result.data;		
					FloorPlanService.getAllRooms().then(function(_result){
						initRooms(_result.data);	
						setWeekDate(0);
					});
				});
				
				function initRooms(objs){
					scope.value.rooms = [];
					for(i=0;i<objs.length;i++){
						room = {
							"roomNumber":objs[i].roomNumber,
							"days":[]
						};
						scope.value.rooms.push(room);
					}
				}
				
				function setDaysOfWeek(_firstDay){
					scope.value.theDaysOfWeek = [];
					var newday = new Date(_firstDay);
					for(var i=0; i<7; i++){
						var day = newday.getDate();
						scope.value.theDaysOfWeek.push(day);
						newday = new Date(newday.setDate(day + 1));
					}
				}
				
				function setRoomColor(_room){
					var thedate = new Date(scope.value.firstDayOfWeek);
					var roomNumber = _room.roomNumber;
					for(var i=0; i<7; i++){
						color = getRoomDayColor(roomNumber, thedate);
						_room.days[i] = color;
						thedate = thedate.setDate(thedate.getDate() + 1);
						thedate = new Date(thedate);
					}
				}
				
				function getRoomDayColor(_room, _date){
					for(var i=0; i<scope.value.floorplans.length; i++){
						var floor = scope.value.floorplans[i];
						if(floor.roomNumber == _room){
							startdate = strToDate(floor.startDate);
							enddate = strToDate(floor.endDate);
							if(compareDate(startdate,_date)>=0 && 
									compareDate(enddate, _date)<=0){
								return floor.statusColor;
							}
						}
					}
				}
				
				scope.value.isDayOfToday = function(_date){
					return isToday(_date);
				}
				
				// set selected table cell row and column 
				scope.value.selectCell = function(_row, _col){
					scope.value.selectedRow = _row;
					scope.value.selectedColumn = _col;
				}
				// set selected table cell backtground color
				scope.value.changeSelectedCellBgColor = function(_row,_col,_room){
					if(scope.value.selectedRow==_row &&
							scope.value.selectedColumn==_col){
						return "grey";
					}else{
						return _room.days[_col];
					}
				}
				
				scope.value.getColour = function(obj){
					if(obj.status=='Reserved'){
						return "yellow";
					}
					return obj.colour;
				}
				
				scope.value.nextWeek = function(){
					setWeekDate(1);
				}
				
				scope.value.previousWeek = function(){
					setWeekDate(-1);
				}
				
				function setWeekDate(counter){
					var firstDayOfWeek = new Date();
					var lastDayOfWeek = new Date();
					if(counter==0){
						var thedate = new Date();
						var weekstart = thedate.getDate() - thedate.getDay() + 1;
						firstDayOfWeek.setDate(weekstart);
						lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
					}else if(counter==1){
						firstDayOfWeek = new Date(scope.value.firstDayOfWeek);
						firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
						lastDayOfWeek = new Date(firstDayOfWeek);
						lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
					}else if(counter==-1){
						firstDayOfWeek = new Date(scope.value.firstDayOfWeek);
						firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 7);
						lastDayOfWeek = new Date(firstDayOfWeek);
						lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);						
					}
					dd1 = firstDayOfWeek.getDate();
					mm1 = firstDayOfWeek.getMonth();
					yy1 = firstDayOfWeek.getFullYear();
					
					dd2 = lastDayOfWeek.getDate();
					mm2 = lastDayOfWeek.getMonth();
					yy2 = lastDayOfWeek.getFullYear();
					
					if(yy1!=yy2){
						scope.value.dateOfWeek = dd1 + ' ' + scope.value.months[mm1] + ' ' + yy1 + ' - ' + dd2 + ' ' + scope.value.months[mm2] + ' ' + yy2; 
					}else if(mm1!=mm2){
						scope.value.dateOfWeek = dd1 + ' ' + scope.value.months[mm1] + ' - ' + dd2 + ' ' + scope.value.months[mm2] + ' ' + yy1; 
					}else{
						scope.value.dateOfWeek = dd1 + ' - ' + dd2 + ' ' + scope.value.months[mm1] + ' ' + yy1;
					}
					
					scope.value.firstDayOfWeek = new Date(firstDayOfWeek);
					
					setDaysOfWeek(new Date(firstDayOfWeek));
					
					for(var i=0;i<scope.value.rooms.length;i++){
						setRoomColor(scope.value.rooms[i]);
					}
				}
				
			}
	}
}]);

