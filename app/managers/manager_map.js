var ManagerMap = function () {
	var maps = [];
    var portal_sets = [];
	var index = 0;

    var delay = 0;

	var initialize = function(){
		clear();
	};

    var update = function(){
        getCurrentMap().update();

        if(delay > 0){
            delay--;
        }
    };

    var updatePortal = function(character){   
        $.each(portal_sets, function(i, portal_set){
            var exist = false;
            var portal = portal_set.getCurrent(getCurrentMapID());
            portal.update(getCurrentMap().getPosition());

            if(portal != null){
                exist = true;
            }

            var position = character.getPosition();
            position.y -= 10;

            if(exist && $_Extension.hitTest(portal, position, 'center bottom')){
                if(Game.key[38]){
                    triggerPortal(portal_set, character);
                }
            }
        });
    };

    var triggerPortal = function(portal_set, character){
        if(delay == 0){
            delay = 10;

            var connection = portal_set.getConnection(getCurrentMapID()).getData();

            getCurrentMap().removeCharacter(character);
            start(connection.map);
            getCurrentMap().addCharacter(character);
            getCurrentMap().update();

            var map_position = getCurrentMap().getPosition();
            character.setPosition(connection.position.x + map_position.x, connection.position.y + map_position.y);
        }
    };

    var getCurrentMap = function(){
        return maps[index].map;
    };

    var getCurrentMapID = function(){
        return maps[index].id;
    };

    var start = function(key){
        $.each(maps, function(i, object){
            if(object.id === key){
                index = i;
                return;
            }
        });
    };

	var clear = function(){
		maps = [];
		index = 0;
	};

    return {
        init: function () {
        	initialize();
        },

        start: function(key){
            start(key);
        },

        update: function(character){
            update();
            updatePortal(character);
        },

        clear: function(){
        	clear();
        },

        addMap: function(name, map){
        	maps.push({
        		id: name,
        		map: map
        	});
        },

        addCharacter: function(map_name, character){
            $.each(maps, function(i, object){
                if(object.id === map_name){
                    object.map.addCharacter(character);
                    return;
                }
            });
        },

        addPortalSet: function(set){
            portal_sets.push(set);
        },

        getCurrentMap: function(){
            return getCurrentMap();
        },

        getCurrentMapID: function(){
            return getCurrentMapID();
        },

        getObjects: function(){
            var scene_objects = getCurrentMap().getObjects();

            $.each(portal_sets, function(i, portal_set){
                var portal = portal_set.getCurrent(getCurrentMapID());
                if(portal != null){
                    var object = portal.getObject();
                    scene_objects.push(object);
                }
            });

            return scene_objects;
        }
    };
};