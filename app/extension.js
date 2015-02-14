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

$_Extension.hitTest = function(object, position, type){
    var area_position = object.getPosition();
    var area_size = object.getSize();

    var isHit = false;
    var area = {
    	x: area_position.x,
    	y: area_position.y,
    	w: area_size.width,
    	h: area_size.height
    }

    if(type.indexOf("center") != -1){
    	area.x = parseInt(area_position.x - (area_size.width / 2));
    }else if(type.indexOf("right") != -1){
    	area.x = parseInt(area_position.x - area_size.width);
    }

    if(type.indexOf("middle") != -1){
    	area.y = parseInt(area_position.y - (area_size.height / 2));
    }else if(type.indexOf("bottom") != -1){
    	area.y = parseInt(area_position.y - area_size.height);
    }

	if(area.x < position.x && area.x + area.w > position.x
		&& area.y < position.y && area.y + area.h > position.y){
		isHit = true;
	}

    return isHit;
};