var ManagerScene = function () {
	var scenes = [];
	var index = 0;

	var initialize = function(){
		clear();
	};

	var clear = function(){
		scenes = [];
		scene_index = 0;
	};

    return {
        init: function () {
        	initialize();
        },

        start: function(key){
            $.each(scenes, function(i, object){
                if(object.id === key){
                    index = i;
                    object.scene.init();
                    return;
                }
            })
        },

        clear: function(){
        	clear();
        },

        getCurrentScene: function(){
        	return scenes[index].scene;
        },

        addScene: function(name, scene){
        	scenes.push({
        		id: name,
        		scene: scene
        	});
        }
    };
};