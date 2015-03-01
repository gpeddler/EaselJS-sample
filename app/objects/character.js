var Character = function () {
	var sprite, cloth;
	var bubble_head, bubble_body, bubble_tail, bubble_text;
	var tag_nick, tag_back;
	var action = "stay";

	var spriteSheet = new createjs.SpriteSheet({
		"images": ["assets/img/character.png"],
		"frames": {"regX": 60, "height": 140, "count": 23, "regY": 140, "width": 120},
		"animations": {
			"stay": [0, 11, "stay"],
			"run": [12, 22, "run", 0.5]
		}
	});

	var cloth_index = 0;
	var cloth_sprites = [
		new createjs.SpriteSheet({
			"images": ["assets/img/character_cloth1.png"],
			"frames": {"regX": 60, "height": 140, "count": 23, "regY": 140, "width": 120},
			"animations": {
				"stay": [0, 11, "stay"],
				"run": [12, 22, "run", 0.5]
			}
		})
	];

	var _id;
	var _nickname;

	var x;
	var y;
	var speed = 8;
	var gravity_acc = 0;

	var count_chat = 0;

	var initialize = function(config, ix, iy){
		_id = config.id;
		_nickname = config.nickname;
		sprite = new createjs.Sprite(spriteSheet, "stay");
		cloth = new createjs.Sprite(cloth_sprites[cloth_index], "stay");
		
		bubble_text = new createjs.Text("Text", "13px Arial", "#333333");
		bubble_text.lineWidth = 160;
		bubble_text.lineHeight = 15;
		bubble_text.maxWidth = 160;

		bubble_head = new createjs.Bitmap('assets/img/bubble/head.png');
		bubble_body = new createjs.Bitmap('assets/img/bubble/body.png');
		bubble_tail = new createjs.Bitmap('assets/img/bubble/tail.png');

		tag_nick = new createjs.Text("Text", "13px Arial", "#FFFFFF");
		tag_nick.text = _nickname;

		tag_back =  new createjs.Shape();
 		tag_back.graphics.beginFill("#000000").drawRect(0, 0, tag_nick.getBounds().width + 10, tag_nick.getBounds().height + 6);
 		tag_back.alpha = 0.7;

		x = ix;
		y = iy;
	};

	var update = function(){
		y += parseFloat(gravity_acc);

		sprite.x = x;
		sprite.y = parseInt(y);
		cloth.x = x;
		cloth.y = parseInt(y);

		if(count_chat > 0){
			bubble_text.visible = true;
			bubble_head.visible = true;
			bubble_body.visible = true;
			bubble_tail.visible = true;

			bubble_text.x = x - parseInt(bubble_text.getBounds().width / 2);
			bubble_text.y = y - 150 - bubble_text.getBounds().height;

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

		tag_nick.x = x - parseInt(tag_nick.getBounds().width / 2);
		tag_nick.y = y + 5;
		tag_back.x = tag_nick.x - 5;
		tag_back.y = tag_nick.y - 3;
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
			cloth.gotoAndPlay(name);
			sprite.gotoAndPlay(name);
			
		}
	};

	return {
        init: function (config, ix, iy) {
    		initialize(config, ix, iy);
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
				cloth.scaleX = 1;
				doAction('run');
    		}else if(name === "move_right"){
    			x += speed;
				sprite.scaleX = -1;
				cloth.scaleX = -1;
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
	    		var input = _nickname + " : ";
	    		for(var i = 0; i <= parseInt(content.length / 13); i++){
					input += content.substr(i * 13, 13) + " ";
				}

				bubble_text.text = input;

				count_chat = 90;
	    	}
        },

        sync: function(data){
        	x = data.x;
        	y = data.y;
        	nickname = data.nickname;
        	doAction(data.action);
        	sprite.scaleX = data.xscale;
        	cloth.scaleX = data.xscale;
        	gravity_acc = data.gravity;
        	count_chat = data.count_chat,
			bubble_text.text = data.count_text;
        },

        isFalling: function(){
        	if(gravity_acc >= 0){
        		return true;
        	}
        	return false;
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
    			type: 'sprite',
    			data: cloth
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
    		});

    		return objects;
        },

        getFrontObjects: function(){
        	var objects = [];

        	objects.push({
        		type: 'graphic',
        		data: tag_back
        	});

        	objects.push({
    			type: 'text',
    			data: tag_nick
    		});

    		return objects;
        },

        getSyncData: function(){
    		return {
    			id: _id,
    			x: x,
    			y: y,
    			xscale: sprite.scaleX,
    			nickname: _nickname,
    			action: action,
    			gravity: gravity_acc,
    			count_chat: count_chat,
    			count_text: bubble_text.text
    		};
        }
    };
}