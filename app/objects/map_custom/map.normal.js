var MAP_NORMAL = function(){

	var floors = [
		{ x: 100, y: 100, type: 'assets/floor/normal'},
		{ x: 150, y: 70, type: 'assets/floor/normal'},
		{ x: 220, y: 400, type: 'assets/floor/normal'},
		{ x: 520, y: 600, type: 'assets/floor/normal'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(1280, 720);

		var floor = new Floor();
		floor.init(100, 100, 'assets/floor/normal');

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