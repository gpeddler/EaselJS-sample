var Game = function () {
	var stage;
	var preloader;

	var monster;

	var initialize = function(){
		stage = new createjs.Stage("screen");

		monster = new Monster();
		monster.init();

		var map = new Map();
		map.init();

		stage.addChild(map.getObject());
		stage.addChild(monster.getSprite());

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", render);
	}

	var render = function(event){
		monster.update();
		stage.update();
	}

    return {
        init: function () {
    		initialize();
        }
    };
}();