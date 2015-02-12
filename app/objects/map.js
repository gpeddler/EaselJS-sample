var Map = function () {
	var x = 0;
	var y = 0;
	var width = 1280;
	var height = 720;

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
        background.x = x;
        background.y = y;

		$.each(floors, function(i, floor){
            floor.getObject().data.x = floor.getPosition().x + x;
            floor.getObject().data.y = floor.getPosition().y + y;

			floor.update();
		});

		$.each(characters, function(i, character){
            character.getObject().data.x = character.getPosition().x + x;
            character.getObject().data.y = character.getPosition().y + y;

			character.update();
		});
	};

	return {
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

        init: function (iwidth, iheight) {
    		initialize(iwidth, iheight);
        },

        update: function(){
        	update();
        },

        setBackground: function(url){
        	background = new createjs.Bitmap(url);
        },

        addCharacter: function(icharacter){
        	characters.push(icharacter);
        },

        addFloor: function(ifloor){
        	floors.push(ifloor);
        },

        getObjects: function(){
        	var objects = [];
        	objects.push({
                type: 'bitmap',
                data: background
            });

        	$.each(floors, function(i, floor){
    			objects.push(floor.getObject());
        	});

        	$.each(characters, function(i, character){
        		objects.push(character.getObject());
        	});

    		return objects;
        }
    };
}