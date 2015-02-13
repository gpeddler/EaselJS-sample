var MAP_DARK = function(){

	var floors = [
		{ x: 0, y: 850, type: 'assets/floor/dark_long'},
		{ x: 1600, y: 850, type: 'assets/floor/dark_long'},

		{ x: 200, y: 750, type: 'assets/floor/dark_short'},
		{ x: 400, y: 650, type: 'assets/floor/dark_short'},
		{ x: 600, y: 550, type: 'assets/floor/dark_short'},
		{ x: 800, y: 450, type: 'assets/floor/dark_short'},

		{ x: 1000, y: 350, type: 'assets/floor/dark_short'},
		{ x: 1200, y: 250, type: 'assets/floor/dark_short'},
		{ x: 1400, y: 150, type: 'assets/floor/dark_short'},

		{ x: 600, y: 350, type: 'assets/floor/dark_short'},
		{ x: 400, y: 250, type: 'assets/floor/dark_short'},
		{ x: 200, y: 130, type: 'assets/floor/dark_short'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(3200, 1000);
		map.setBackground('assets/img/background_dark.png');

		$.each(floors, function(i, data){
			var floor = new Floor();
			floor.init(data.x, data.y, data.type);
			
			map.addFloor(floor);
		});

		return map;
	};

	return create();
}