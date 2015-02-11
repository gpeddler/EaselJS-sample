var Floor = function () {
	var x = 0;
	var y = 0;

	var image;
	var data_area;

	var initialize = function(ix, iy, url){
		image = new createjs.Bitmap(url + "/image.png");
		x = ix;
		y = iy;

    	$.getJSON(url + "/area.json", function(data){ console.log(data) });
	};

	var update = function(){
		image.x = x;
		image.y = y;
	};

	return {
		x: x,
		y: y,

        init: function (ix, iy, url) {
    		initialize(ix, iy, url);
        },

        update: function(){
        	update();
        },

        getObject: function(){
    		return image;
        }
    };
}