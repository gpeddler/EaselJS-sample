var $_Extension = {};

$_Extension.hitTestByFloor = function(floor, position){
	var floor_area = floor.getAreaData();
    var floor_position = floor.getPosition();
    var hit_position = -1;

    if(floor_area.area.type === "hitarea"){
		var area = {
			x: floor_area.area.content[0] + floor_position.x,
			y: floor_area.area.content[2] + floor_position.y,
			w: floor_area.area.content[1],
			h: floor_area.area.content[3]
		}

		if(area.x < position.x && area.x + area.w > position.x
			&& area.y < position.y && area.y + area.h > position.y){
			hit_position = area.y;
		}
    }

    return parseInt(hit_position);
};