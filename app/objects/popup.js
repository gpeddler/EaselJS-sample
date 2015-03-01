var Popup = function () {
    var x, y;
    var popup_top, popup_middle, popup_bottom, popup_text;
    var active = false;
    var dom_input   = null;
    
    var sprites     = [];
    var bitmaps     = [];
    var inputTexts  = [];
    var buttons     = [];
  
    var initialize = function(ix, iy){
        console.log('Popup Init!!!');
        popup_text = new createjs.Text("Text", "12px Arial", "#333333");
        popup_text.lineWidth = 160;
        popup_text.lineHeight = 15;
        popup_text.maxWidth = 160;

        popup_top = new createjs.Bitmap('assets/img/popup/popup_top.png');
        popup_middle = new createjs.Bitmap('assets/img/popup/popup_middle.png');
        popup_bottom = new createjs.Bitmap('assets/img/popup/popup_bottom.png');

        x = ix;
        y = iy;    
    };

    var addInputText = function(ix, iy){
        var element_input = $("<input type='text' id='input_user'>");
            element_input.css('position', 'absolute')
                         .css('left', '0')
                         .css('top', '0')
                         .css('width', '100px');
                        //.css('width', width + 'px');

        $("body").append(element_input);

        dom_input = new createjs.DOMElement(element_input.attr('id'));
    };

    var update = function(){
        if(active){
            popup_text.visible = true;
            popup_top.visible = true;
            popup_middle.visible = true;
            popup_bottom.visible = true;  

            popup_top.x = x;
            popup_top.y = y;

            popup_middle.x = x;
            popup_middle.y = y + 33;

            popup_bottom.x = x;
            popup_bottom.y = y + 66;

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = true;
            });
        }else{
            popup_text.visible = false;
            popup_top.visible = false;
            popup_middle.visible = false;
            popup_bottom.visible = false;  

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = false;             
            });
        }
    };

    return {
        init: function (ix, iy){
            initialize(ix, iy);
        },

        update: function() {
            update();
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

        addSprite: function(isprite) {
            sprites.push(isprite);
        },

        addText: function(itext){
            if(itext.text !== ""){
                var inputText = itext.text;
                var input = "";
                for(var i = 0; i <= parseInt(inputText.length / 33); i++){
                    input += inputText.substr(i * 33, 33) + " ";
                }

                popup_text.text = input;
                popup_text.x    = x + itext.x;
                popup_text.y    = y + itext.y;
            }
        },

        addBitmap: function(ibitmap){
            ibitmap.x       += x;
            ibitmap.y       += y;
            bitmaps.push(ibitmap);
        },

        addButton: function(ibutton){
            buttons.push(ibutton);
        },

        addInputText: function(ix, iy, inputText){
            inputTexts.push(inputText);
        },

        getSize: function(){
            return {
                width: 500,
                height: popup_bottom.y - popup_top.y
            }
        },

        getPosition: function() {
            return {
                x: x,
                y: y
            }
        },

        clear : function(){
            sprites = [];
            bitmaps = [];
            buttons = [];
            inputTexts = [];
        },

        getObjects: function(){
            var objects = [];

            objects.push({
                type: 'bitmap',
                data: popup_top
            });

            objects.push({
                type: 'bitmap',
                data: popup_middle
            });

            objects.push({
                type: 'bitmap',
                data: popup_bottom
            });

            objects.push({
                type: 'text',
                data: popup_text
            });

            $.each(sprites, function(i, sprite){
                objects.push(sprite);
            });

            $.each(buttons, function(i, button){
                objects.push({
                    type : 'button',
                    data :  button
                });
            });

            $.each(inputTexts, function(i, inputText){
                objects.push(inputText);
            });

            $.each(bitmaps, function(i, bitmap){
                objects.push({
                    type: 'bitmap',
                    data: bitmap
                });
            });

            return objects;
        }
    };
};
