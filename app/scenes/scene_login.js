var SceneLogin = function () {
    var STATUS = "empty";
    var NEXT = null;

	var background;
    var submit;
    var input_id = $("<input type = 'text' required='' placeholder = 'UserId' id = 'usr_id'>");
        input_id.css('position', 'absolute')
                .css('backgroundColor', '#d3ffce')
                .css('left', '100px')
                .css('top', '100px');

    var input_pwd = $("<input type = 'password' required='' placeholder = 'Password' id = 'usr_pwd' >");
        input_pwd.css('position', 'absolute')
                 .css('backgroundColor', '#d3ffce')
                .css('left', '100px')
                .css('top', '130px');

    var btn_login = $("<input type = 'submit' id = 'usr_login' value= 'Log in'>");
        btn_login.css('position', 'absolute')
                .css('backgroundColor', '#ffec8b')
                .css('left', '100px')
                .css('top', '160px')
                .css('width', '45px');

    var btn_join = $("<input type = 'submit' id = 'usr_join' value= 'Join'>");
        btn_join.css('position', 'absolute')
                .css('backgroundColor', '#ffec8b')
                .css('left', '150px')
                .css('top', '160px')
                .css('width', '45px');

	var initialize = function(){
        STATUS = "running";

        background = new createjs.Bitmap('assets/img/background.png');

        $('body').append(input_id);
        $('body').append(input_pwd);
        $('body').append(btn_login);
        $('body').append(btn_join);

        $('#usr_login').click(function(e){
            submit();
        });

        $('#usr_join').click(function(e){
            join();
        });
	};

	var update = function(){
	};

    var submit = function(){
        var id  = usr_id.value;
        var pwd = usr_pwd.value;

        $.post(Game.host + "/users/login",
        {
            id: id,
            pwd: pwd
        },
        function(data, status){
            if(data.result){
                Game.setSocket(io.connect(Game.host));
                Game.setUserID(data.user_id);

                var socket = Game.getSocket();
                socket.on('connect', function() {
                    socket.emit('adduser', data.user_id);
                    finish();
                });
            }
        });
    };

    var join = function(){
        location.replace('register.html');
    };

    var finish = function(){
        $('#usr_id').remove();
        $('#usr_pwd').remove();
        $('#usr_login').remove();
        $('#usr_join').remove();

        STATUS = 'finish';
    };

    return {
        init: function () {
        	initialize();
        },

        update: function(){
        	update();
        },

        setNext: function(inext){
            NEXT = inext;
        },

        getObjects: function(){
        	var objects = [];
            objects.push({
                type: 'bitmap',
                data: background
            });

            return objects;
        },

        getStatus: function(){
            return STATUS;
        },

        getNext: function(){
            return NEXT;
        },

        finish: function(){
            finish();
        }
    };
};
