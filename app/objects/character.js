var Character = function () {
	var sprite;
	var action = "stay";

	var x;
	var y;

	var initialize = function(ix, iy, isprite){
		sprite = new createjs.Sprite(isprite, "stay");
		x = ix;
		y = iy;
	};

	var update = function(){

	};

	var doAction = function(name){
		if(action !== name){
			action = name;
			sprite.gotoAndPlay(name);
		}
	}

	return {
		getPosition: function(){
			return {
				x: x,
				y: y,
			}
		},

        init: function (ix, iy, isprite) {
    		initialize(ix, iy, isprite);
        },

        update: function(){
    		update();
        },

        action: function(name){
    		if(name === "stay"){
				doAction('stay');
    		}else if(name === "move_left"){
				x -= 3;
				sprite.scaleX = 1;
				doAction('run');
    		}else if(name === "move_right"){
    			x += 3;
				sprite.scaleX = -1;
				doAction('run');
    		}
        },

        getObject: function(){
    		return {
    			type: 'sprite',
    			data: sprite
    		};
        }
    };
}