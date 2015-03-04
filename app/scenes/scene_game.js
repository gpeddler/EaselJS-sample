var SceneGame = function () {
	var STATUS = "empty";
	var NEXT = null;

	var manager_party;
	var manager_map;
	var character;
	var camera;
	var chat;

	var portal_set;

	var socket;
	var ui_btns = [];

	// cameara moving
	var hope_map_x = 0;
	var hope_map_y = 0;

	var popup = null;

	var initialize = function(param){
		STATUS = "running";

		console.log(param);

		character = new Character();
		character.init(Game.getUser(), 50, 620);

		manager_party = new ManagerParty();
		manager_party.init();

		manager_map = new ManagerMap();
		manager_map.init();
		manager_map.addMap('cafe_1', new MAP_CAFE());
		manager_map.addMap('dot_1', new MAP_DOT());

		manager_map.addCharacter(param.map, character);

		manager_map.start(param.map);

		camera = new Camera();
		camera.init(character);

		chat = new Chat();
		chat.init();

		initializeUI();
	};

	var initializeUI = function(){
		var ui_btn_info = new Button();	
		var action_info = function(){
			alert('준비중입니다.');
		};
		ui_btn_info.init('assets/img/btn_ui_info.png', action_info, {x: 876, y: 617, width: 100, height: 100});

		var ui_btn_project = new Button();	
		var action_project = function(){
			alert('준비중입니다.');
		};
		ui_btn_project.init('assets/img/btn_ui_project.png', action_project, {x: 976, y: 617, width: 100, height: 100});

		var ui_btn_party = new Button();	
		var action_party = function(){
			popup = new POPUP_PARTY_CREATE(
				function(){
					console.log('파티생성');
					popup.toggleActive();
				},
				function(){
					popup.toggleActive();
				}
			);
			popup.toggleActive();
			// var result = manager_party.createParty();
			// if(result){
				
			// }else{
				
			// }
		};
		ui_btn_party.init('assets/img/btn_ui_party.png', action_party, {x: 1076, y: 617, width: 100, height: 100});

		var ui_btn_out = new Button();	
		var action_out = function(){
			NEXT = {scene: 'town', param: null};
			finish();
		};
		ui_btn_out.init('assets/img/btn_ui_out.png', action_out, {x: 1176, y: 617, width: 100, height: 100});

		ui_btns = [
			ui_btn_info,
			ui_btn_project,
			ui_btn_party,
			ui_btn_out
		];
	};

	var initializeSocket = function(){
		socket = Game.getSocket();

		socket.on('updatechat', function(username, data){
			chat.appendArea(username, data);
		});

		socket.on('updategame', function(data){
			data = $.grep(data, function(object) {
				return object.id != character.getSyncData().id;
			});

			manager_map.sync(data, character);
		});
	};

	var update = function(){
		keyboardControl();	

		manager_map.update(character);
		chat.update();

		if(popup !== null){
			popup.update();
		}
		
		$.each(ui_btns, function(i, object){
    		object.update();
    	});

		updateCharacterControl();
		updateCamera();
	};

	var updateSync = function(){
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

	var generatePortalSet = function(data){
		var portal_set = new PortalSet();

		$.each(data, function(i, object){
			var portal = new Portal();
			portal.init(object);

			portal_set.addPortal(portal);
		});

		return portal_set;
	};

	var finish = function(){
		socket.removeAllListeners('updatechat');
		socket.removeAllListeners('updategame');

		chat.remove();

        STATUS = 'finish';
    };

    return {
        init: function (param) {
        	initialize(param);
        	initializeSocket();
        },

        update: function(){
        	update();
        	updateSync();
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

        	$.each(ui_btns, function(i, object){
        		objects.push(object.getObject());
        	});

        	if(popup !== null){
	        	$.merge(objects, popup.getObjects());
	        }

        	return objects;
        },

        finish: function(){
        	finish();
        }
    };
};