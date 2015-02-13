var Floor = function () {
	var x = 0;
	var y = 0;

	var image;
	var data_area;

	var initialize = function(ix, iy, url){
		image = new createjs.Bitmap(url + "/image.png");
		x = ix;
		y = iy;

		if(Math.random() * 100 < 50){
			direction = -1;
		}

    	$.getJSON(url + "/area.json", function(data){
    		data_area = data 
    	});
	};

	var update = function(){
		image.x = x;
		image.y = y;
	};

	return {
        init: function (ix, iy, url) {
    		initialize(ix, iy, url);
        },

        update: function(){
        	update();
        },

        getObject: function(){
    		return {
    			type: 'bitmap',
    			data: image
    		};
        },

        getPosition: function(){
			return {
				x: x,
				y: y
			};
		},

		getAreaData: function(){
			return data_area;
		}
    };
}