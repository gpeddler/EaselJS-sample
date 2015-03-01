var MAP_CAFE = function(){

	var layers = [
		{ width: 2430, height: 720, url: 'assets/img/map_cafe/background.png'},
		{ width: 2430, height: 720, url: 'assets/img/map_cafe/layer.png'}
	];

	var layers_front = [
		{ width: 2430, height: 720, url: 'assets/img/map_cafe/layer_front.png'}
	];

	var floors = [
		{ x: 0, y: 675, type: 'assets/floor/transparent'},
		{ x: 200, y: 675, type: 'assets/floor/transparent'},
		{ x: 400, y: 675, type: 'assets/floor/transparent'},
		{ x: 600, y: 675, type: 'assets/floor/transparent'},
		{ x: 800, y: 675, type: 'assets/floor/transparent'},
		{ x: 1000, y: 675, type: 'assets/floor/transparent'},
		{ x: 1200, y: 675, type: 'assets/floor/transparent'},
		{ x: 1400, y: 675, type: 'assets/floor/transparent'},
		{ x: 1600, y: 675, type: 'assets/floor/transparent'},
		{ x: 1800, y: 675, type: 'assets/floor/transparent'},
		{ x: 2000, y: 675, type: 'assets/floor/transparent'},
		{ x: 2200, y: 675, type: 'assets/floor/transparent'},
		{ x: 2400, y: 675, type: 'assets/floor/transparent'},

		{ x: -100, y: 325, type: 'assets/floor/transparent'},
		{ x: 100, y: 325, type: 'assets/floor/transparent'},
		{ x: 300, y: 325, type: 'assets/floor/transparent'},
		{ x: 500, y: 325, type: 'assets/floor/transparent'},
		{ x: 700, y: 325, type: 'assets/floor/transparent'},
		{ x: 900, y: 325, type: 'assets/floor/transparent'},
		{ x: 1100, y: 325, type: 'assets/floor/transparent'},
		{ x: 1300, y: 325, type: 'assets/floor/transparent'},
		{ x: 1680, y: 325, type: 'assets/floor/transparent'},
		{ x: 1880, y: 325, type: 'assets/floor/transparent'},
		{ x: 2080, y: 325, type: 'assets/floor/transparent'},
		{ x: 2280, y: 325, type: 'assets/floor/transparent'},
		{ x: 2480, y: 325, type: 'assets/floor/transparent'},

		{ x: 1247, y: 623, type: 'assets/floor/transparent120'},
		{ x: 1284, y: 593, type: 'assets/floor/transparent120'},
		{ x: 1324, y: 561, type: 'assets/floor/transparent120'},
		{ x: 1361, y: 528, type: 'assets/floor/transparent120'},
		{ x: 1402, y: 496, type: 'assets/floor/transparent120'},
		{ x: 1439, y: 465, type: 'assets/floor/transparent120'},
		{ x: 1467, y: 432, type: 'assets/floor/transparent120'},
		{ x: 1502, y: 402, type: 'assets/floor/transparent120'},
		{ x: 1537, y: 372, type: 'assets/floor/transparent120'},
		{ x: 1567, y: 342, type: 'assets/floor/transparent120'},

		//책상위
		{ x: 69, y: 251, type: 'assets/floor/transparent120'},
		{ x: 270, y: 251, type: 'assets/floor/transparent120'},
		{ x: 482, y: 251, type: 'assets/floor/transparent120'},
		{ x: 684, y: 251, type: 'assets/floor/transparent120'},
		{ x: 912, y: 251, type: 'assets/floor/transparent120'},
		{ x: 1140, y: 251, type: 'assets/floor/transparent120'},
		{ x: 1378, y: 251, type: 'assets/floor/transparent120'},
		{ x: 1593, y: 251, type: 'assets/floor/transparent120'},
		{ x: 1801, y: 251, type: 'assets/floor/transparent120'},
		{ x: 2029, y: 251, type: 'assets/floor/transparent120'},
		{ x: 2234, y: 251, type: 'assets/floor/transparent120'},

		{ x: 316, y: 600, type: 'assets/floor/transparent'},
		{ x: 516, y: 600, type: 'assets/floor/transparent'},
		{ x: 716, y: 600, type: 'assets/floor/transparent'},
		{ x: 916, y: 600, type: 'assets/floor/transparent'}
	];
	
	var create = function(){
		var map = new Map();
		map.init(2430, 720);
		map.setBackground('assets/img/map_cafe/background.png');

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

		$.each(layers_front, function(i, layer){
			var map_layer = new MapLayer();
			map_layer.init(layer.width, layer.height);
			map_layer.setBackground(layer.url);
			map.addFrontLayer(map_layer);
		});

		return map;
	};

	return create();
}