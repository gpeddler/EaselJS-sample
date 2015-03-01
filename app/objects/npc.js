var Npc = function () {
    var npc_obj = null;
    var npc_bit = null;

    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;

    var action = null;
    var popup_room, popup_2;

    var initialize = function(url, type, bounds){
        npc_obj = new createjs.Bitmap(url);
        npc_bit = new createjs.Bitmap(url);
        popup_room = new Popup();
        popup_2 = new Popup();

        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;

        popup_room.init(500, 99);
        popup_2.init(500, 132);

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
        popup_2.update();
    };

    var actionClickRoom = function(e){
        popup_room.toggleActive();

        var btn_room2 = new Button();
            btn_room2.init('assets/img/btn_party_s.png', joinRoom, {x: 150, y:40, width: 170, height: 96});

        npc_bit.scaleX = 0.8;
        npc_bit.scaleY = 0.8;
        npc_bit.x = 10;
        npc_bit.y = 10;

        popup_2.addBitmap(npc_bit);
        popup_room.addButton(btn_room2);
    };

    var actionClick2 = function(e){
        popup_2.toggleActive();

        npc_bit.scaleX = 0.7;
        npc_bit.scaleY = 0.7;
        npc_bit.x = 10;
        npc_bit.y = 10;

        popup_2.addBitmap(npc_bit);

        var text = new createjs.Text("안녕하세요! 저는 오늘부터 'test1'님과 1일째 입니다. 제 이름은 카페지기 입니다. 제 남자친구가 빨간색 구두를 사주었습니다^^.", "15px Arial", "#333333");
            text.x = 150;
            text.y = 15;

        popup_2.addText(text);
    };

    var joinRoom = function(){
        alert('방 입장한척!?');
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
            $.merge(objects, popup_2.getObjects());

            return objects;
        }
    };
}