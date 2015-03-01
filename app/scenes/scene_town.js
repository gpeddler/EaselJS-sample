var SceneTown = function () {
	var STATUS = "empty";
    var NEXT = null;

	var manager_map;
	var character;
	var camera;
	var chat;

	var portal_set;

	var socket;

	// cameara moving
	var hope_map_x = 0;
	var hope_map_y = 0;

	var initialize = function(){
		STATUS = "running";
		
		character = new Character();
		character.init(Game.getUser(), 50, 620);

		manager_map = new ManagerMap();
		manager_map.init();
		manager_map.addMap('town', new MAP_TOWN());
		manager_map.addCharacter('town', character);

		manager_map.start('town');

		camera = new Camera();
		camera.init(character);

		chat = new Chat();
		chat.init();

		socket = Game.getSocket();

		socket.on('updatechat', function(username, data){
			chat.appendArea(username, data);
		});

		socket.on('updategame', function(data){
			data = $.grep(data, function(object) {
				return object.id != character.getID();
			});

			manager_map.sync(data);
		});
	};

	var update = function(){
		keyboardControl();

		manager_map.update(character);
		chat.update();

		updateCharacterControl();
		updateCamera();

		var data_sync = character.getSyncData();
		data_sync['map'] = manager_map.getCurrentMapID();
		socket.emit('syncgame', data_sync);
	};

	var updateCamera = function(){
		camera.update(manager_map.getCurrentMap());

		var current_map = manager_map.getCurrentMap();
		var camera_x = -1 * camera.getPosition().x;
		var camera_y = -1 * camera.getPosition().y;

		hope_map_x += (camera_x - current_map.getPosition().x) / 6;
		hope_map_y += (camera_y - current_map.getPosition().y) / 6;

		current_map.setPosition(hope_map_x, hope_map_y);
	};

	var updateCharacterControl = function(){
		var character_x = character.getPosition().x;
		var map_x = manager_map.getCurrentMap().getPosition().x;

		if(character_x + map_x < 50){
			character.setPosition(50 - map_x, null);
		}else if(character_x + map_x > 1230){
			character.setPosition(1230 - map_x, null);
		}
	};

	var keyboardControl = function(){
		if(Game.key_sec[13] == 9){
			if(chat.isActive()){
				character.chat(chat.getText());
				socket.emit('sendchat', chat.getText());

				$('#area_chat').scrollTop($('#area_chat').prop('scrollHeight'))

				chat.clear();
			}

			chat.toggleActive();
		}
		
		if(!chat.isActive()){
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
		}
	};

	var finish = function(){
        STATUS = 'finish';
    };

    return {
        init: function () {
        	initialize();
        },

        update: function(){
        	update();
        },

        setNext: function(inext){
            NEXT = inext;
        },

        getStatus: function(){
            return STATUS;
        },

        getNext: function(){
            return NEXT;
        },

        getObjects: function(){
        	var objects = [];

        	$.merge(objects, manager_map.getObjects());
        	$.merge(objects, chat.getObjects());

        	return objects;
        },

        finish: function(){
            finish();
        }
    };
};