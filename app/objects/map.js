var Map = function () {
	var x = 0;
	var y = 0;
	var width = 1280;
	var height = 720;

    var gravity = 0.98;

	var background;
    var layers = [];
	var characters = [];
	var floors = [];

	var initialize = function(iwidth, iheight){
		width = iwidth;
		height = iheight;

        background = null;
        layers = [];
		characters = [];
		floors = [];
	};

	var update = function(){

        $.each(layers, function(i, layer){
            layer.getObject().data.x = x * ((layer.getSize().width - 1280) / (width - 1280));
        });

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

            $.each(character.getObjects(), function(i, object){
                object.data.x += x;
                object.data.y += y;
            });
		});
	};

	return {
        init: function (iwidth, iheight) {
    		initialize(iwidth, iheight);
        },

        update: function(){
        	update();
        },

        findCharacter: function(id){
            var result = null;

            $.each(characters, function(i, character){
                if(character.getID() === id){
                    result = character
                    return false;
                }
            });

            return result;
        },

        addCharacter: function(icharacter){
        	characters.push(icharacter);
        },

        addLayer: function(ilayer){
            layers.push(ilayer);
        },

        addFloor: function(ifloor){
            floors.push(ifloor);
        },

        removeCharacter: function(icharacter){
            characters.splice($.inArray(icharacter, characters),1);
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

            $.each(layers, function(i, layer){
                objects.push(layer.getObject());
            });

        	$.each(characters, function(i, character){
        		$.merge(objects, character.getObjects());
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