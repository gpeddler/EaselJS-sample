var Game = function () {
	var stage;

	var width = 0;
	var height = 0;

	var key = [];
	var manager_scene;

	var initialize = function(){
		stage = new createjs.Stage("screen");

		manager_scene = new ManagerScene();
		manager_scene.init();
		manager_scene.addScene("game", new SceneGame());

		manager_scene.start("game");

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", render);
	};

	var render = function(event){
		var current_scene = manager_scene.getCurrentScene();
		var objects = current_scene.getObjects();

		$.each(objects, function(i, object){
			if(stage.getChildIndex(object) == -1){
				stage.addChild(object);
			}
		});

		$("body").keydown(function(e){
			key[e.keyCode] = 1;
		});

		$("body").keyup(function(e){
			key[e.keyCode] = 0;
		});

		current_scene.update();
		stage.update();
	};

    return {
    	width: width,
    	height: height,
    	key: key,

        init: function (screen_width, screen_height) {
        	$('#screen').attr({ width: screen_width, height: screen_height });

        	width = screen_width;
        	height = screen_height;

    		initialize();
        }
    };
}();