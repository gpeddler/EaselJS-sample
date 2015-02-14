var PortalSet = function () {
    var portals = [];

	var initialize = function(){
		clear();
	};

    var update = function(){
        
    };

	var clear = function(){
		portals = [];
	};

    return {
        init: function () {
        	initialize();
        },

        update: function(){
            update();
        },

        clear: function(){
        	clear();
        },

        addPortal: function(portal){
        	portals.push(portal);
        },

        getCurrent: function(map){
            var object = null;

            $.each(portals, function(i, portal){
                var data = portal.getData();

                if(data.map === map){
                    object = portal;
                }
            });

            return object;
        },

        getConnection: function(map){
            var object = null;

            $.each(portals, function(i, portal){
                var data = portal.getData();

                if(data.map !== map){
                    object = portal;
                }
            });

            return object;
        },

        getObjects: function(map){
            var objects = [];
            $.each(portals, function(i, portal){
                var data = portal.getData();

                if(data.map === map){
                    objects.push(portal.getObject());
                }
            });

            return objects;
        }
    };
};