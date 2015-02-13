var MAP_TOP = function(){

	var floors = [
		{ x: 0, y: 1370, type: 'assets/floor/normal'},
		{ x: 160, y: 1370, type: 'assets/floor/normal'},
		{ x: 320, y: 1370, type: 'assets/floor/normal'},
		{ x: 480, y: 1370, type: 'assets/floor/normal'},
		{ x: 640, y: 1370, type: 'assets/floor/normal'},
		{ x: 800, y: 1370, type: 'assets/floor/normal'},
		{ x: 960, y: 1370, type: 'assets/floor/normal'},
		{ x: 1120, y: 1370, type: 'assets/floor/normal'},

		{ x: 160, y: 1270, type: 'assets/floor/normal'},
		{ x: 320, y: 1170, type: 'assets/floor/normal'},
		{ x: 480, y: 1070, type: 'assets/floor/normal'},
		{ x: 640, y: 970, type: 'assets/floor/normal'},
		{ x: 800, y: 870, type: 'assets/floor/normal'},
		{ x: 960, y: 770, type: 'assets/floor/normal'},

		{ x: 160, y: 270, type: 'assets/floor/normal'},
		{ x: 320, y: 370, type: 'assets/floor/normal'},
		{ x: 480, y: 470, type: 'assets/floor/normal'},
		{ x: 640, y: 570, type: 'assets/floor/normal'},
		{ x: 800, y: 670, type: 'assets/floor/normal'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(1280, 1440);
		map.setBackground('assets/img/background.png');

		$.each(floors, function(i, data){
			var floor = new Floor();
			floor.init(data.x, data.y, data.type);
			
			map.addFloor(floor);
		});

		return map;
	};

	return create();
}