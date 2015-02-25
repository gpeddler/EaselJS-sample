var MAP_TOWN = function(){

	var layers = [
		{ width: 2808, height: 720, url: 'assets/img/map_town/background.jpg'},
	];

	var floors = [
		{ x: 0, y: 620, type: 'assets/floor/town'},
		{ x: 100, y: 620, type: 'assets/floor/town'},
		{ x: 200, y: 620, type: 'assets/floor/town'},
		{ x: 300, y: 620, type: 'assets/floor/town'},
		{ x: 400, y: 620, type: 'assets/floor/town'},
		{ x: 500, y: 620, type: 'assets/floor/town'},
		{ x: 600, y: 620, type: 'assets/floor/town'},
		{ x: 700, y: 620, type: 'assets/floor/town'},
		{ x: 800, y: 620, type: 'assets/floor/town'},
		{ x: 900, y: 620, type: 'assets/floor/town'},
		{ x: 1000, y: 620, type: 'assets/floor/town'},
		{ x: 1100, y: 620, type: 'assets/floor/town'},
		{ x: 1200, y: 620, type: 'assets/floor/town'},
		{ x: 1300, y: 620, type: 'assets/floor/town'},
		{ x: 1400, y: 620, type: 'assets/floor/town'},
		{ x: 1500, y: 620, type: 'assets/floor/town'},
		{ x: 1600, y: 620, type: 'assets/floor/town'},
		{ x: 1700, y: 620, type: 'assets/floor/town'},
		{ x: 1800, y: 620, type: 'assets/floor/town'},
		{ x: 1900, y: 620, type: 'assets/floor/town'},
		{ x: 2000, y: 620, type: 'assets/floor/town'},
		{ x: 2100, y: 620, type: 'assets/floor/town'},
		{ x: 2200, y: 620, type: 'assets/floor/town'},
		{ x: 2300, y: 620, type: 'assets/floor/town'},
		{ x: 2400, y: 620, type: 'assets/floor/town'},
		{ x: 2500, y: 620, type: 'assets/floor/town'},
		{ x: 2600, y: 620, type: 'assets/floor/town'},
		{ x: 2700, y: 620, type: 'assets/floor/town'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(2800, 720);
		map.setBackground('assets/img/map_dot/sky.png');

		$.each(layers, function(i, layer){
			var map_layer = new MapLayer();
			map_layer.init(layer.width, layer.height);
			map_layer.setBackground(layer.url);
			map.addLayer(map_layer);
		});

		$.each(floors, function(i, data){
			var floor = new Floor();
			floor.init(data.x, data.y, data.type);
			
			map.addFloor(floor);
		});

		return map;
	};

	return create();
}