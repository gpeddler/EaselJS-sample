var MAP_LONG = function(){

	var floors = [
		{ x: 0, y: 650, type: 'assets/floor/normal'},
		{ x: 160, y: 650, type: 'assets/floor/normal'},
		{ x: 320, y: 650, type: 'assets/floor/normal'},
		{ x: 480, y: 650, type: 'assets/floor/normal'},
		{ x: 640, y: 650, type: 'assets/floor/normal'},
		{ x: 800, y: 650, type: 'assets/floor/normal'},
		{ x: 960, y: 650, type: 'assets/floor/normal'},
		{ x: 1120, y: 650, type: 'assets/floor/normal'},
		{ x: 1280, y: 650, type: 'assets/floor/normal'},
		{ x: 1440, y: 650, type: 'assets/floor/normal'},
		{ x: 1600, y: 650, type: 'assets/floor/normal'},
		{ x: 1760, y: 650, type: 'assets/floor/normal'},
		{ x: 1920, y: 650, type: 'assets/floor/normal'},
		{ x: 2080, y: 650, type: 'assets/floor/normal'},
		{ x: 2240, y: 650, type: 'assets/floor/normal'},
		{ x: 2400, y: 650, type: 'assets/floor/normal'},
		{ x: 1000, y: 200, type: 'assets/floor/normal'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(2560, 720);
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