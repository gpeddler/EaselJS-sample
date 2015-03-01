var Button = function () {
	var background = null;
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;

    var action = null;

	var initialize = function(url, iaction, bounds){
        background = new createjs.Bitmap(url);

        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;

        action = iaction;

        background.addEventListener("click", action);
        background.addEventListener("mouseover", actionMouseOver);
        background.addEventListener("mouseout", actionMouseOut);
	};

    var update = function(){
        background.x = x;
        background.y = y;
    };

    var actionMouseOver = function(event){
        var colorFilter = new createjs.ColorFilter(0.9, 0.9, 0.9, 1);
        background.filters = [colorFilter];
        background.cache(0, 0, width, height);
    };

    var actionMouseOut = function(event){
        background.filters = [];
        background.cache(0, 0, width, height);
    };

	return {
        init: function (url, iaction, bounds) {
    		initialize(url, iaction, bounds);
        },

        update: function(){
            update();
        },

        getObject: function(){
            return {
                type: 'bitmap',
                data: background
            }
        }
    };
}