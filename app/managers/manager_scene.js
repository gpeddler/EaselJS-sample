var ManagerScene = function () {
	var scenes = [];
	var index = 0;

    var stage;

	var initialize = function(istage){
        stage = istage;
        stage.autoClear = true;
		clear();
	};

    var update = function(){
        var current_scene = getCurrentScene();

        if(current_scene.getStatus() === 'finish'){
            if(current_scene.getNext() != null){
                start(current_scene.getNext());
            }
        }else{
            var objects = current_scene.getObjects();

            stage.removeAllChildren();

            $.each(objects, function(i, object){
                if(stage.getChildIndex(object.data) == -1){
                    stage.addChild(object.data);
                }
            });

            current_scene.update();
        }
    };

    var getCurrentScene = function(){
        return scenes[index].scene;
    };

    var start = function(key){
        $.each(scenes, function(i, object){
            if(object.id === key){
                index = i;
                object.scene.init();
                return;
            }
        });
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
            start(key);
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