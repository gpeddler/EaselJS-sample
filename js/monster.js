var Monster = function () {
	
	var spriteSheet = new createjs.SpriteSheet({
		"images": ["./img/monster.png"],
		"frames": {"regX": 32, "height": 64, "count": 20, "regY": 64, "width": 64},
		"animations": {
			"stay": [0, 10, "stay"],
			"run": [11, 19, "run", 0.5]
		}
	});

	var sprite;
	var action = "stay";
	var key = [];

	var x = 200;
	var y = 300;

	var initialize = function(){
		sprite = new createjs.Sprite(spriteSheet, "stay");
		sprite.x = x;
		sprite.y = y;
	};

	var update = function(){
		sprite.x = x;
		sprite.y = y;

		$("body").keydown(function(e){
			key[e.keyCode] = 1;
		});

		$("body").keyup(function(e){
			key[e.keyCode] = 0;
		});

		if(key[37]){ //left
			x -= 3;
			sprite.scaleX = 1;
			doAction('run');
		}else if(key[39]){ //right
			x += 3;
			sprite.scaleX = -1;
			doAction('run');
		}else{
			doAction('stay');
		}
	};

	var doAction = function(name){
		if(action !== name){
			action = name;
			sprite.gotoAndPlay(name);
		}
	}

	return {
		x: x,
		y: y,

        init: function () {
    		initialize();
        },

        update: function(){
    		update();
        },

        getSprite: function(){
    		return sprite;
        }
    };
}