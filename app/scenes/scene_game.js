var SceneGame = function () {
	var manager_map;
	var character;
	var camera;

	var portal_set;

	var spriteSheet_character = new createjs.SpriteSheet({
		"images": ["assets/img/monster.png"],
		"frames": {"regX": 32, "height": 64, "count": 20, "regY": 64, "width": 64},
		"animations": {
			"stay": [0, 10, "stay"],
			"run": [11, 19, "run", 0.5]
		}
	});

	// cameara moving
	var hope_map_x = 0;
	var hope_map_y = 0;

	var initialize = function(){
		character = new Character();
		character.init(50, 620, spriteSheet_character);

		manager_map = new ManagerMap();
		manager_map.init();
		manager_map.addMap('first', new MAP_DOT());
		manager_map.addMap('second', new MAP_LONG());

		manager_map.addCharacter('first', character);

		manager_map.addPortalSet(generatePortalSet(
			[
				{ map: 'first', position: { x: 1100, y: 620 } },
				{ map: 'second', position: { x: 80, y: 650 } }
			]
		));

		manager_map.start('first');

		camera = new Camera();
		camera.init(character);
	};

	var update = function(){
		keyboardControl();

		updateCamera();
		manager_map.update(character);

		var character_x = character.getPosition().x;
		var map_x = manager_map.getCurrentMap().getPosition().x;

		if(character_x + map_x < 50){
			character.setPosition(50 - map_x, null);
		}else if(character_x + map_x > 1230){
			character.setPosition(1230 - map_x, null);
		}
	};

	var updateCamera = function(){
		camera.update(manager_map.getCurrentMap());

		var current_map = manager_map.getCurrentMap();
		var camera_x = -1 * camera.getPosition().x;
		var camera_y = -1 * camera.getPosition().y;

		// hope_map_x += (camera_x - current_map.getPosition().x) / 6;
		// hope_map_y += (camera_y - current_map.getPosition().y) / 6;

		// current_map.setPosition(hope_map_x, hope_map_y);
		current_map.setPosition(camera_x, camera_y);
	};

	var keyboardControl = function(){
		
		if(Game.key[37]){
			character.action('move_left');
		}else if(Game.key[39]){
			character.action('move_right');
		}else{
			character.action('stay');
		}

		if(Game.key[65]){
			//attack
		}else if(Game.key[83]){
			character.action('jump');
		}

		if(Game.key[81]){
			manager_map.start('first');
		}else if(Game.key[87]){
			manager_map.start('second');
		}
	};

	var generatePortalSet = function(data){
		var portal_set = new PortalSet();

		$.each(data, function(i, object){
			var portal = new Portal();
			portal.init(object);

			portal_set.addPortal(portal);
		});

		return portal_set;
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
        	$.merge(objects, manager_map.getObjects());

        	return objects;
        },

        finish: function(){

        }
    };
};