var Popup = function () {
    var x, y;
    var popup_top, popup_middle, popup_bottom, popup_text;
    var active = false;
    var inputText   = null;
    
    var sprites     = [];
    var bitmaps     = [];
    var inputTexts  = [];
    var buttons     = [];
  
    var initialize = function(ix, iy){
        popup_text = new createjs.Text(" ", "12px Arial", "#333333");
        popup_text.lineWidth = 160;
        popup_text.lineHeight = 15;
        popup_text.maxWidth = 160;

        popup_top = new createjs.Bitmap('assets/img/popup/popup_top.png');
        popup_middle = new createjs.Bitmap('assets/img/popup/popup_middle.png');
        popup_bottom = new createjs.Bitmap('assets/img/popup/popup_bottom.png');

//        btn_close = new Button();
 //       btn_close.init('assets/img/close.png', toggleActive, { x : ix + 200, y : iy, width : 30, height : 30 });

        x = ix;
        y = iy;    
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

            popup_top.x = x;
            popup_top.y = y;

            popup_middle.x = x;
            popup_middle.y = y + 33;
            popup_middle.scaleY = 3;

            popup_bottom.x = x;
            popup_bottom.y = y + 132;

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
            toggleActive();
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
            ibutton.setPosition(x + ibutton.getPosition().x, y + ibutton.getPosition().y);
            buttons.push(ibutton);
        },

        addInputText: function(iinputText){
            addInputText(iinputText);
            //inputTexts.push(iinputText);
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
