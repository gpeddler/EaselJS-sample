var Camera = function () {
	var x = 0;
	var y = 0;
    var width = 1280;
    var height = 720;

    var target = null;
    var map = null;

	var initialize = function(itarget, imap){
        target = itarget;
        map = imap;
	};

    var update = function(){
        var position = {
            x: 0,
            y: 0
        }

        position.x = parseInt(target.getPosition().x - width / 2);
        position.y = parseInt(target.getPosition().y - height / 2);

        if(position.x < 0){
            position.x = 0;
        }else if(position.x + width > map.getSize().width){
            position.x = map.getSize().width - width;
        }

        if(position.y < 0){
            position.y = 0;
        }else if(position.y + height > map.getSize().height){
            position.y = map.getSize().height - height;
        }

        x = position.x;
        y = position.y;
    };

    return {
        init: function (itarget, imap) {
        	initialize(itarget, imap);
        },

        update: function() {
            update();
        },

        getPosition: function() {
            return {
                x: x,
                y: y
            }
        },

        setSize: function(iwidth, iheight){
            width = iwidth;
            height = iheight;
        }
    };
};