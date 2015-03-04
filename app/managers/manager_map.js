var ManagerMap = function () {
	var maps = [];
    var portal_sets = [];

	var index = 0;
    var delay = 0;

    var data_sync = [];

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

    var sync = function(data, ignore_character){
        var list = [];

        $.each(maps, function(i, map){
            $.each(map.map.getCharacters(), function(k, character){
                if(ignore_character.getSyncData().id === character.getSyncData().id){
                    return true;
                }
                list.push({
                    state: 'wait',
                    map: map.id,
                    character: character
                });
            });
        });

        $.each(data, function(i, row){
            var target = find(list, row.id);
            if(target === null){
                var character = new Character();
                character.init({ id: row.id, nickname: row.nickname }, row.x, row.y);
                character.sync(row);

                addCharacter(row.map, character);
            }else{
                if(target.map === row.map){
                    var character = findCharacter(target.map, target.character.getSyncData().id);
                    character.sync(row);
                }else{
                    var character = target.character;
                    getMap(row.map).map.removeCharacter(character);
                    addCharacter(row.map, character);
                }
                target.state = 'sync';
            }
        });

        $.each(list, function(i, row){
            if(row.state === 'wait'){
                getMap(row.map).map.removeCharacter(row.character);
            }
        });

        function find(list, id){
            var result = null;

            $.each(list, function(i, row){
                if(row.character.getSyncData().id === id){
                    result = row;
                    return false;
                }
            });

            return result;
        }
    };

    var syncCharacter = function(map_name, data){
        $.each(maps, function(i, map){
            if(map.id === map_name){
                map.map.syncCharacter(data.id, data);
                return false;
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

    var findCharacter = function(map_name, id){
        var result = null;

        $.each(maps, function(i, map){
            if(map.id === map_name){
                result = map.map.findCharacter(id);
                return false;
            }
        });

        return result;
    };

    var addCharacter = function(map_name, character){
        $.each(maps, function(i, object){
            if(object.id === map_name){
                object.map.addCharacter(character);
                return;
            }
        });
    };

    var addNpc = function(map_name, npc){
        $.each(maps, function(i, object){
            if(object.id === map_name){
                object.map.addNpc(npc);
                return;
            }
        });
    };

    var getMap = function(id){
        var result = null;

        $.each(maps, function(i, map){
            if(map.id === id){
                result = map;
                return false;
            }
        });

        return result;
    };

    var getCurrentMap = function(){
        return maps[index].map;
    };

    var getCurrentMapID = function(){
        return maps[index].id;
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

        sync: function(data, ignore_character){
            sync(data, ignore_character);
        },

        findCharacter: function(map_name, id){
            findCharacter(map_name, id);
        },

        addMap: function(name, map){
        	maps.push({
        		id: name,
        		map: map
        	});
        },

        addCharacter: function(map_name, character){
            addCharacter(map_name, character);
        },

        addNpc: function(map_name, npc){
            addNpc(map_name, npc);
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