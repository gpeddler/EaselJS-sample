var ManagerScene = function () {
	var scenes = [];
	var index = 0;

    var stage;

	var initialize = function(istage){
        stage = istage;
		clear();
	};

    var update = function(){
        var current_scene = getCurrentScene();
        var objects = current_scene.getObjects();

        $.each(objects, function(i, object){
            if(stage.getChildIndex(object.data) == -1){
                stage.addChild(object.data);
            }
        });

        current_scene.update();
    };

    var getCurrentScene = function(){
        return scenes[index].scene;
    };

	var clear = function(){
		scenes = [];
		index = 0;
	};

    return {
        init: function (istage) {
        	initialize(istage);
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

        update: function(){
            update();
        },

        clear: function(){
        	clear();
        },

        addScene: function(name, scene){
        	scenes.push({
        		id: name,
        		scene: scene
        	});
        }
    };
};