var Npc = function () {
    var npc_obj = null;
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;

    var action = null;
    var popup_room, popup_party;

    var initialize = function(url, type, bounds){
        npc_obj = new createjs.Bitmap(url);
        
        popup_room = new Popup();
        popup_party = new Popup();

        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;

        popup_room.init(x - bounds.width, y - bounds.height/2 * 1.5);
        popup_party.init(x - bounds.width, y - bounds.height/2 * 1.5);

        if(type === 'room'){
            npc_obj.addEventListener("click", actionClickRoom);
        }else if(type === 'click2'){
            npc_obj.addEventListener("click", actionClick2);
        }

        npc_obj.addEventListener("mouseover", actionMouseOver);
        npc_obj.addEventListener("mouseout", actionMouseOut);
    };

    var update = function(){
        npc_obj.x = x;
        npc_obj.y = y;

        popup_room.update();
        popup_party.update();
    };

    var actionClickRoom = function(e){
        popup_room.toggleActive();

        var btn_room1 = new Button();
            btn_room1.init('assets/img/btn_party_s.png', joinRoom, {x: 250, y:30, width: 170, height: 96});

        var btn_room2 = new Button();
            btn_room2.init('assets/img/btn_party_s.png', joinRoom, {x: 60, y:30, width: 170, height: 96});
    
        popup_room.addButton(btn_room1);
        popup_room.addButton(btn_room2);
    };

    var actionClick2 = function(e){
   
    };

    var joinRoom = function(){
        alert('방 입장한척!');
    };

    var actionMouseOver = function(e){
        var colorFilter = new createjs.ColorFilter(0.9, 0.9, 0.9, 1);
        npc_obj.filters = [colorFilter];
        npc_obj.cache(0, 0, width, height);
    };

    var actionMouseOut = function(e){
        npc_obj.filters = [];
        npc_obj.cache(0, 0, width, height);
    };

    return {
        init: function (url, type, bounds) {
            initialize(url, type, bounds);
        },

        update: function(){
            update();
        },

        setVisible: function(bool){
            npc_obj.visible = bool;
        },

        setPosition: function(ix, iy){
            x = ix;
            y = iy;
        },

        getPosition: function(){
            return {
                x : x,
                y : y
            }
        },

        getObjects: function(){
           
            var objects = [];

            objects.push({
                type: 'bitmap',
                data: npc_obj
            });
        
            $.merge(objects, popup_room.getObjects());
            $.merge(objects, popup_party.getObjects());

            return objects;
        }
    };
}