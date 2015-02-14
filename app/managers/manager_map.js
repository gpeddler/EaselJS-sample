var ManagerMap = function () {
	var maps = [];
    var portal_sets = [];
	var index = 0;

    var iii = 0;

	var initialize = function(){
		clear();
	};

    var update = function(){
        getCurrentMap().update();
        iii++;
    };

    var updatePortal = function(character){
        $.each(portal_sets, function(i, portal_set){
            var exist = false;
            var portal = portal_set.getCurrent(getCurrentMapID());

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
        var connection = portal_set.getConnection(getCurrentMapID()).getData();

        getCurrentMap().removeCharacter(character);
        start(connection.map);
        getCurrentMap().addCharacter(character);

        character.setPosition(100, 300);
    };

    var getCurrentMap = function(){
        return maps[index].map;
    };

    var getCurrentMapID = function(){
        return maps[index].id;
    };

    var start = function(key){
        iii = 0;
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
            updatePortal(character);
            update();
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

            if(iii == 1){
                console.log(scene_objects);
            }

            $.each(portal_sets, function(i, portal_set){
                var portal = portal_set.getCurrent(getCurrentMapID());
                if(portal != null){
                    scene_objects.push(portal.getObject());
                }
            });

            return scene_objects;
        }
    };
};