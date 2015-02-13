var SceneGame = function () {
	var map;
	var character;
	var camera;

	// cameara moving
	var hope_map_x = 0;
	var hope_map_y = 0;

	var initialize = function(){
		var spriteSheet_character = new createjs.SpriteSheet({
			"images": ["assets/img/monster.png"],
			"frames": {"regX": 32, "height": 64, "count": 20, "regY": 64, "width": 64},
			"animations": {
				"stay": [0, 10, "stay"],
				"run": [11, 19, "run", 0.5]
			}
		});

		character = new Character();
		character.init(200, 300, spriteSheet_character);

		map = new MAP_DARK();
		map.addCharacter(character);

		camera = new Camera();
		camera.init(character, map);
	};

	var update = function(){
		keyboardControl();

		camera.update();

		var camera_x = -1 * camera.getPosition().x;
		var camera_y = -1 * camera.getPosition().y;

		hope_map_x += (camera_x - map.getPosition().x) / 6;
		hope_map_y += (camera_y - map.getPosition().y) / 6;

		map.setPosition(hope_map_x, hope_map_y);
		map.update();
	};

	var keyboardControl = function(){
		
		if(Game.key[37]){
			character.action('move_left');
		}else if(Game.key[39]){
			character.action('move_right');
		}else{
			character.action('stay');
		}

		if(Game.key[38]){
			character.action('jump');
		}
	};

    return {
        init: function () {
        	initialize();
        },

        update: function(){
        	update();
        },

        getObjects: function(){
        	var objects = [];
        	$.merge(objects, map.getObjects());

        	return objects;
        },

        finish: function(){

        }
    };
};