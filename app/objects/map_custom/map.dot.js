var MAP_DOT = function(){

	var layers = [
		{ width: 1500, height: 720, url: 'assets/img/map_dot/bush_back.png'},
		{ width: 1800, height: 720, url: 'assets/img/map_dot/bush_front.png'},
		{ width: 2000, height: 720, url: 'assets/img/map_dot/castle.png'}
	];

	var floors = [
		{ x: 0, y: 620, type: 'assets/floor/dot'},
		{ x: 100, y: 620, type: 'assets/floor/dot'},
		{ x: 200, y: 620, type: 'assets/floor/dot'},
		{ x: 300, y: 620, type: 'assets/floor/dot'},
		{ x: 400, y: 620, type: 'assets/floor/dot'},
		{ x: 500, y: 620, type: 'assets/floor/dot'},
		{ x: 600, y: 620, type: 'assets/floor/dot'},
		{ x: 700, y: 620, type: 'assets/floor/dot'},
		{ x: 800, y: 620, type: 'assets/floor/dot'},
		{ x: 900, y: 620, type: 'assets/floor/dot'},
		{ x: 1000, y: 620, type: 'assets/floor/dot'},
		{ x: 1100, y: 620, type: 'assets/floor/dot'},
		{ x: 1200, y: 620, type: 'assets/floor/dot'},
		{ x: 1300, y: 620, type: 'assets/floor/dot'},
		{ x: 1400, y: 620, type: 'assets/floor/dot'},
		{ x: 1500, y: 620, type: 'assets/floor/dot'},
		{ x: 1600, y: 620, type: 'assets/floor/dot'},
		{ x: 1700, y: 620, type: 'assets/floor/dot'},
		{ x: 1800, y: 620, type: 'assets/floor/dot'},
		{ x: 1900, y: 620, type: 'assets/floor/dot'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(2000, 720);
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