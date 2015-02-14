var MapLayer = function () {
    var x = 0;
    var y = 0;
	var width = 1280;
	var height = 720;

	var background;

	var initialize = function(iwidth, iheight){
		width = iwidth;
		height = iheight;
	};

	var update = function(){
        background.x = x;
        background.y = y;
	};

	return {
        init: function (iwidth, iheight) {
    		initialize(iwidth, iheight);
        },

        getPosition: function(){
            return {
                x: x,
                y: y
            }
        },

        getSize: function(){
            return {
                width: width,
                height: height
            }
        },

        getObject: function(){
    		return {
                type: 'bitmap',
                data: background
            };
        },

        setPosition: function(ix, iy){
            if(ix != null){
                x = ix;
            }

            if(iy != null){
                y = iy;
            }
        },

        setBackground: function(url){
            background = new createjs.Bitmap(url);
        }
    };
}