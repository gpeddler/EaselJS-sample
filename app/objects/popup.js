var Popup = function () {
    var x, y;
    var width, height;

    var popup_title;
    var popup_top, popup_middle, popup_bottom;
    var btn_close;

    var active = false;
    var inputText   = null;
    
    var sprites     = [];
    var bitmaps     = [];
    var inputs      = [];
    var buttons     = [];
    var texts       = [];
  
    var initialize = function(title, iheight){
        clear();

        popup_top = new createjs.Bitmap('assets/img/popup/popup_top.png'); // 50
        popup_middle = new createjs.Bitmap('assets/img/popup/popup_middle.png'); // 24
        popup_bottom = new createjs.Bitmap('assets/img/popup/popup_bottom.png'); // 13

        popup_title = new createjs.Text("Text", "bold 20px Arial", "#333333");

        popup_title.lineWidth = 460;
        popup_title.lineHeight = 25;
        popup_title.maxWidth = 460;

        popup_title.text = title;

        height = iheight;

        x = 390;
        y = 360 - parseInt(height / 2) - 50;

        btn_close = new Button();
        btn_close.init('assets/img/popup/btn_close.png', toggleActive, { x : x + 466, y : y + 12, width : 17, height : 17 });  

        popup_title.x = x + 17;
        popup_title.y = y + 12;
    };

    var toggleActive = function(){
        if(active){
            active = false;
            clear();
        }else{
            active = true;
        }
    };

    var update = function(){
        if(active){
            x = 390;
            y = 360 - parseInt(height / 2) - 50;

            popup_top.x = x;
            popup_top.y = y

            popup_middle.scaleY = parseFloat(height / 24);
            popup_middle.x = x;
            popup_middle.y = y + 50;
            
            popup_bottom.x = x;
            popup_bottom.y = y + 50 + height;

            btn_close.update();

            popup_top.visible = true;
            popup_middle.visible = true;
            popup_bottom.visible = true;
            popup_title.visible = true;

            btn_close.setVisible(true);

            $.each(texts, function(i, text){
                text.visible = true;
            });

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = true;
            });

            $.each(buttons, function(i, button){
                button.setVisible(true);
                button.update();
            });

            $.each(inputs, function(i, input){
                input.visible = true;  
            });

        }else{
            popup_top.visible = false;
            popup_middle.visible = false;
            popup_bottom.visible = false; 
            popup_title.visible = false;

            btn_close.setVisible(false);

            $.each(texts, function(i, text){
                text.visible = false;
            });

            $.each(bitmaps, function(i, bitmap){
                bitmap.visible = false;             
            });

            $.each(buttons, function(i, button){
                button.setVisible(false);
            });

            $.each(inputs, function(i, input){
                input.visible = false;  
            });
        }
    };

    var clear = function(){
        $.each(inputs, function(i, input){
            var element = input.htmlElement;
            element.remove();
        });

        sprites = [];
        bitmaps = [];
        buttons = [];
        inputs = [];
    };

    return {
        init: function (title, iheight){
            initialize(title, iheight);
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
            itext.x += x;
            itext.y += y;
            texts.push(itext);
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

        addInput: function(iinput){
            iinput.x += x;
            iinput.y += y;
            inputs.push(iinput);
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
            clear();
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
                data: popup_title
            })

            $.each(texts, function(i, text){
                objects.push({
                    type: 'text',
                    data: text
                });
            });

            $.each(inputs, function(i, input){
                objects.push({
                    type: 'dom',
                    data: input
                });
            });
            
            // $.each(sprites, function(i, sprite){
            //     objects.push(sprite);
            // });

            $.each(buttons, function(i, button){
                objects.push(button.getObject());
            });

            // $.each(bitmaps, function(i, bitmap){
            //     objects.push({
            //         type: 'bitmap',
            //         data: bitmap
            //     });
            // });

            objects.push(btn_close.getObject());

            return objects;
        }
    };
};
