var Character = function () {
	var sprite;
	var action = "stay";

	var x;
	var y;
	var speed = 15;
	var gravity_acc = 0;

	var initialize = function(ix, iy, isprite){
		sprite = new createjs.Sprite(isprite, "stay");
		x = ix;
		y = iy;
	};

	var update = function(){
		y += parseFloat(gravity_acc);

		sprite.x = x;
		sprite.y = parseInt(y);
	};

	var gravity = function(igravity){
		if(igravity == 0){
			gravity_acc = 0;
		}
		gravity_acc += parseFloat(igravity);
	};

	var doAction = function(name){
		if(action !== name){
			action = name;
			sprite.gotoAndPlay(name);
		}
	};

	return {
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
				x -= speed;
				sprite.scaleX = 1;
				doAction('run');
    		}else if(name === "move_right"){
    			x += speed;
				sprite.scaleX = -1;
				doAction('run');
    		}else if(name === "jump"){
    			if(gravity_acc == 0){
	    			y -= 10;
	    			gravity_acc = -15;
	    		}
    		}
        },

        gravity: function(igravity){
        	gravity(igravity);
        },

        getPosition: function(){
			return {
				x: x,
				y: y,
			}
		},

		setPosition: function(ix, iy){
			if (ix != null){
				x = ix;
			}
			
			if (iy != null){
				y = iy;
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