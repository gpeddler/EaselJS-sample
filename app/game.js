var Game = function () {
	var stage;

	var width = 0;
	var height = 0;

	var key = [];
	var manager_scene;

	var initialize = function(){			
		console.log('Game initialize');

		stage = new createjs.Stage("screen");

		manager_scene = new ManagerScene();
		manager_scene.init(stage);
		manager_scene.addScene("login", new SceneLogin());

		manager_scene.start("login");

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", render);
	};

	var render = function(event){
		$("body").keydown(function(e){
			key[e.keyCode] = 1;
		});

		$("body").keyup(function(e){
			key[e.keyCode] = 0;
		});

		manager_scene.update();
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