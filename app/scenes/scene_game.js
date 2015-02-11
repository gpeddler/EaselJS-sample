var SceneGame = function () {
	var map;
	var character;

	var gravity = 9.81;

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

		map = new MAP_NORMAL();
		map.addCharacter(character);
	};

	var update = function(){
		keyboardControl();

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