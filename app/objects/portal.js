var Portal = function () {
    var x = 0;
    var y = 0;

    var spriteSheet_portal = new createjs.SpriteSheet({
        "images": ["assets/img/portal.png"],
        "frames": {"width": 88, "height": 115, "count": 1, "regX": 44, "regY": 115 },
        "animations": {
            "portal": 0
        }
    });

    var data = {};

	var initialize = function(idata){
        data = idata;

        data.sprite = new createjs.Sprite(spriteSheet_portal, "portal");

        x = data.position.x;
        y = data.position.y;
	};

    var update = function(position){
        data.sprite.x = x + position.x;
        data.sprite.y = y + position.y;
    };

    return {
        init: function (idata) {
        	initialize(idata);
        },

        update: function(position){
            update(position);
        },

        getPosition: function(){
            return {
                x: data.position.x,
                y: data.position.y
            }
        },

        getSize: function(){
            return {
                width: 88,
                height: 115
            }
        },

        getData: function(){
            return data;
        },

        getObject: function(){
            return {
                type: 'sprite',
                data: data.sprite
            };
        }
    };
};