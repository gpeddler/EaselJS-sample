var Popup = function () {
    var width, height;
    var screen_x = 400;
    var screen_y = 250;
    var popup_top, popup_middle, popup_bottom, popup_text;
    var active = false;
    var inputText   = null;
    
    var sprites     = [];
    var bitmaps     = [];
    var inputTexts  = [];
    var buttons     = [];
  
    var initialize = function(iwidth, iheight){
        popup_text = new createjs.Text(" ", "15px Arial", "#333333");
        popup_text.lineWidth = 160;
        popup_text.lineHeight = 15;
        popup_text.maxWidth = 160;

        popup_top = new createjs.Bitmap('assets/img/popup/popup_top.png');
        popup_middle = new createjs.Bitmap('assets/img/popup/popup_middle.png');
        popup_bottom = new createjs.Bitmap('assets/img/popup/popup_bottom.png');

//      btn_close = new Button();
 //     btn_close.init('assets/img/close.png', toggleActive, { x : ix + 200, y : iy, width : 30, height : 30 });

        width = iwidth;
        height = iheight;    
    };

    var addInputText = function(iinputText){
        var element_input = iinputText;
        $("body").append(element_input);

        inputText = new createjs.DOMElement(element_input.attr('id'));
        inputTexts.push(inputText);
    };

    var toggleActive = function(){
        if(active){
            active = false;
        }else{
            active = true;
        }
    };

    var update = function(){
        if(active){
            popup_text.visible = true;
            popup_top.visible = true;
            popup_middle.visible = true;
            popup_bottom.visible = true;
           // btn_close.setVisible(true);
            //btn_close.update();

            popup_top.x = screen_x;
            popup_top.y = screen_y;

            var scaleCount = height/33 - 2;
            popup_middle.x = screen_x;
            popup_middle.y = screen_y + 33;
            popup_middle.scaleY = scaleCount;
            
            popup_bottom.x = screen_x;
            popup_bottom.y = screen_y + 33 * ( scaleCount + 1);

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = true;
            });

            $.each(buttons, function(i, button){
                button.setVisible(true);
                button.update();
            });

            $.each(inputTexts, function(i, inputText){
                inputText.visible = true;  
            });

        }else{
            popup_text.visible = false;
            popup_top.visible = false;
            popup_middle.visible = false;
            popup_bottom.visible = false; 
          //  btn_close.visible = false; 

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = false;             
            });

            $.each(buttons, function(i, button){
                button.setVisible(false);
            });

            $.each(inputTexts, function(i, inputText){
                inputText.visible = false;  
            });
        }
    };

    return {
        init: function (iwidth, iheight){
            initialize(iwidth, iheight);
        },

        update: function() {
            update();
        },

        isActive: function() {
            return active;
        },

        toggleActive: function() {
            toggleActive();
        },

        addSprite: function(isprite) {
            sprites.push(isprite);
        },

        addText: function(itext){
            if(itext.text !== ""){
                var inputText = itext.text;
                var input = "";
                for(var i = 0; i <= parseInt(inputText.length / 45); i++){
                    input += inputText.substr(i * 45, 45) + " ";
                }

                popup_text.text = input;
                popup_text.x    = screen_x + itext.x;
                popup_text.y    = screen_y + itext.y;
            }
        },

        addBitmap: function(ibitmap){
            ibitmap.x       += screen_x;
            ibitmap.y       += screen_y;
            bitmaps.push(ibitmap);
        },

        addButton: function(ibutton){
            ibutton.setPosition(screen_x + ibutton.getPosition().x, screen_y + ibutton.getPosition().y);
            buttons.push(ibutton);
        },

        addInputText: function(iinputText){
            addInputText(iinputText);
            //inputTexts.push(iinputText);
        },

        getSize: function(){
            return {
                width: width,
                height: height
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
           // objects.push(btn_close.getObject());
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
                objects.push(button.getObject());
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
