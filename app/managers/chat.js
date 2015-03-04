var Chat = function () {
	var x = 0;
	var y = 620;
    var width = 600;
    var height = 100;

    var active = false;

    var dom_input = null;
    var dom_chat = null;

	var initialize = function(){
        var element_input = $("<input type='text' id='input_user'>");
        element_input.css('position', 'absolute')
            .css('left', '0')
            .css('top', '0')
            .css('width', width + 'px');

        var element_chat = $("<div id='area_chat'></div>");
        element_chat.css('position', 'absolute')
            .css('left', '0')
            .css('top', '0')
            .css('width', width + 'px')
            .css('height', height + 'px');

        $("body").append(element_input);
        $("body").append(element_chat);

        dom_input = new createjs.DOMElement(element_input.attr('id'));
        dom_chat = new createjs.DOMElement(element_chat.attr('id'));
	};

    var update = function(){
        dom_input.x = x;
        dom_chat.x = x;

        if(active){
            dom_input.visible = true;

            dom_input.y = y + height - 28;
            dom_chat.y = y - 28;

            $('#input_user').focus();
        }else{
            dom_input.visible = false;

            dom_input.y = y + height;
            dom_chat.y = y;
        }
    };

    return {
        init: function () {
        	initialize();
        },

        update: function() {
            update();
        },

        remove: function(){
            $("#area_chat").remove();
            $("#input_user").remove();
        },

        clear: function() {
            $('#input_user').val('');
        },

        isActive: function() {
            return active;
        },

        toggleActive: function() {
            if(active){
                active = false;
            }else{
                active = true;
            }
        },

        appendArea: function(id, content){
            $('#area_chat').append("<br>" + id +" : " +  content);
            $('#area_chat').scrollTop($('#area_chat').prop('scrollHeight'));
        },

        getText: function(){
            return $('#input_user').val();
        },

        getPosition: function() {
            return {
                x: x,
                y: y
            }
        },

        getObjects: function(){
            var objects = [];

            objects.push({
                type: 'dom',
                data: dom_input
            });

            objects.push({
                type: 'dom',
                data: dom_chat
            });

            return objects;
        }
    };
};