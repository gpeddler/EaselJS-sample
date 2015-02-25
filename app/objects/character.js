var Character = function () {
	var sprite;
	var bubble_head, bubble_body, bubble_tail, bubble_text;
	var action = "stay";

	var x;
	var y;
	var speed = 15;
	var gravity_acc = 0;

	var count_chat = 0;

	var initialize = function(ix, iy, isprite){
		sprite = new createjs.Sprite(isprite, "stay");
		
		bubble_text = new createjs.Text("Text", "13px Arial", "#333333");
		bubble_text.lineWidth = 160;
		bubble_text.lineHeight = 15;
		bubble_text.maxWidth = 160;

		bubble_head = new createjs.Bitmap('assets/img/bubble/head.png');
		bubble_body = new createjs.Bitmap('assets/img/bubble/body.png');
		bubble_tail = new createjs.Bitmap('assets/img/bubble/tail.png');

		x = ix;
		y = iy;
	};

	var update = function(){
		y += parseFloat(gravity_acc);

		sprite.x = x;
		sprite.y = parseInt(y);

		if(count_chat > 0){
			bubble_text.visible = true;
			bubble_head.visible = true;
			bubble_body.visible = true;
			bubble_tail.visible = true;

			bubble_text.x = x - parseInt(bubble_text.getBounds().width / 2);
			bubble_text.y = y - 90 - bubble_text.getBounds().height;

			bubble_head.x = x - 89;
			bubble_head.y = bubble_text.y - 19;

			bubble_body.x = x - 89;
			bubble_body.y = bubble_text.y;
			bubble_body.scaleY = bubble_text.getBounds().height / 16;

			bubble_tail.x = x - 89;
			bubble_tail.y = bubble_text.y + bubble_text.getBounds().height;

			count_chat --;
		}else{
			bubble_text.visible = false;
			bubble_head.visible = false;
			bubble_body.visible = false;
			bubble_tail.visible = false;
		}
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

        chat: function(content){
        	if(content !== ''){
	    		var input = "";
	    		for(var i = 0; i <= parseInt(content.length / 13); i++){
					input += content.substr(i * 13, 13) + " ";
				}

				bubble_text.text = input;

				count_chat = 90;
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

        getObjects: function(){
    		var objects = [];

    		objects.push({
    			type: 'sprite',
    			data: sprite
    		});

    		objects.push({
    			type: 'bitmap',
    			data: bubble_head
    		});

    		objects.push({
    			type: 'bitmap',
    			data: bubble_body
    		});

    		objects.push({
    			type: 'bitmap',
    			data: bubble_tail
    		});

    		objects.push({
    			type: 'text',
    			data: bubble_text
    		})

    		return objects;
        }
    };
}