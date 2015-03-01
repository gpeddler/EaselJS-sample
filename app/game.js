var Game = function () {
	var stage;
	var data_user = {};

	var width = 0;
	var height = 0;

	var key = [];
	var key_sec = [];
	var manager_scene;

	var socket = null;
	// var host = 'http://growingdever.cafe24.com:3000';
	var host = 'http://192.168.0.53:3000'

	var initialize = function(){		
		stage = new createjs.Stage("screen");
		stage.enableMouseOver(20);  

		manager_scene = new ManagerScene();
		manager_scene.init(stage);

		var scene_login = new SceneLogin();
		var scene_town = new SceneTown();
		var scene_game = new SceneGame();

		scene_login.setNext('game');
		scene_town.setNext('game');

		manager_scene.addScene("login", scene_login);
		manager_scene.addScene("town", scene_town);
		manager_scene.addScene("game", scene_game);

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
    	host: host,

        init: function (screen_width, screen_height) {
        	$('#screen').attr({ width: screen_width, height: screen_height });

        	width = screen_width;
        	height = screen_height;

    		initialize();
        },

        setUser: function(config){
        	data_user = config
        },

        setSocket: function(connect){
        	socket = connect;
        },

        getSocket: function(){
    		return socket;
        },

        getUser: function(){
        	return data_user;
        }
    };
}();