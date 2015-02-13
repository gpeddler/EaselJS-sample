var Map = function () {
	var x = 0;
	var y = 0;
	var width = 1280;
	var height = 720;

    var gravity = 0.98;

	var background;
	var characters = [];
	var floors = [];

	var initialize = function(iwidth, iheight){
		width = iwidth;
		height = iheight;

        background = null;
		characters = [];
		floors = [];
	};

	var update = function(){


		$.each(floors, function(i, floor){
			floor.update();
            floor.getObject().data.x += x;
            floor.getObject().data.y += y;
		});

		$.each(characters, function(i, character){

            var gravity_character = gravity;

            $.each(floors, function(i, floor){
                var hit_position = $_Extension.hitTestByFloor(floor, character.getPosition());
                if(hit_position != -1){
                    character.setPosition(null, hit_position + 1);
                    gravity_character = 0;
                }
            });

            character.gravity(gravity_character);
			character.update();
            character.getObject().data.x += x;
            character.getObject().data.y += y;
		});
	};

	return {
        init: function (iwidth, iheight) {
    		initialize(iwidth, iheight);
        },

        update: function(){
        	update();
        },

        addCharacter: function(icharacter){
        	characters.push(icharacter);
        },

        addFloor: function(ifloor){
        	floors.push(ifloor);
        },

        getPosition: function(){
            return {
                x: x,
                y: y
            }
        },

        getSize: function(){
            return {
                width: width,
                height: height
            }
        },

        getObjects: function(){
        	var objects = [];
        	objects.push({
                type: 'bitmap',
                data: background
            });

        	$.each(characters, function(i, character){
        		objects.push(character.getObject());
        	});

            $.each(floors, function(i, floor){
                objects.push(floor.getObject());
            });

    		return objects;
        },

        setPosition: function(ix, iy){
            if(ix != null){
                x = ix;
            }

            if(iy != null){
                y = iy;
            }
        },

        setBackground: function(url){
            background = new createjs.Bitmap(url);
            background.x = 0;
            background.y = 0;
        }
    };
}