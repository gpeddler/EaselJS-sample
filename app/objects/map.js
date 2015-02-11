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
		characters = [];
		floors = [];
	};

	var update = function(){
		$.each(floors, function(i, floor){
			floor.update();
		});

		$.each(characters, function(i, character){
			character.update();
		});
	};

	return {
		x: x,
		y: y,
		width: width,
		height: height,

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
        	objects.push(background);

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