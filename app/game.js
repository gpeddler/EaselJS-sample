var Game = function () {
	var stage;

	var width = 0;
	var height = 0;

	var key = [];
	var key_sec = [];
	var manager_scene;

	var socket = null;

	var initialize = function(){		
		console.log('Game initialize');

		stage = new createjs.Stage("screen");

		socket = io.connect('http://192.168.0.17:3000');

		socket.on('connect', function() {
			var id = Math.random() * 20000;
			console.log(id);
			socket.emit('adduser', id);
		});

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
			key_sec[e.keyCode] = 10;
		});

		$("body").keyup(function(e){
			key[e.keyCode] = 0;
		});

		$.each(key_sec, function(i, value){
			if(value > 0){
				key_sec[i] -= 1;
			}
		});

		manager_scene.update();
		stage.update();
	};

    return {
    	width: width,
    	height: height,
    	key: key,
    	key_sec: key_sec,

        init: function (screen_width, screen_height) {
        	$('#screen').attr({ width: screen_width, height: screen_height });

        	width = screen_width;
        	height = screen_height;

    		initialize();
        },

        getSocket: function(){
    		return socket;
        }
    };
}();