var MAP_NORMAL = function(){

	var floors = [
		{ x: 0, y: 650, type: 'assets/floor/normal'},
		{ x: 160, y: 650, type: 'assets/floor/normal'},
		{ x: 320, y: 650, type: 'assets/floor/normal'},
		{ x: 480, y: 650, type: 'assets/floor/normal'},
		{ x: 640, y: 650, type: 'assets/floor/normal'},
		{ x: 800, y: 650, type: 'assets/floor/normal'},
		{ x: 960, y: 650, type: 'assets/floor/normal'},
		{ x: 1120, y: 650, type: 'assets/floor/normal'},
		{ x: 160, y: 580, type: 'assets/floor/normal'},
		{ x: 400, y: 510, type: 'assets/floor/normal'},
		{ x: 640, y: 440, type: 'assets/floor/normal'},
		{ x: 880, y: 370, type: 'assets/floor/normal'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(1280, 720);
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