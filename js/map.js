var Map = function () {
	
	var width = 2000;
	var height = 1000;

	var background;

	var x = 0;
	var y = 0;

	var initialize = function(){
		background = new createjs.Bitmap("./img/background.png");
	};

	return {
		x: x,
		y: y,

        init: function () {
    		initialize();
        },

        getObject: function(){
    		return background;
        }
    };
}