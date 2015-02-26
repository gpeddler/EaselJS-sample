var SceneLogin = function () {
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
		console.log('loginScene initialize');
        background = new createjs.Bitmap('assets/img/background.png');
        $('body').append(input_id);
        $('body').append(input_pwd);
        $('body').append(btn_login);
        $('body').append(btn_join);

        $('#usr_login').click(function(e){
            console.log('usr_login clicked');
            submit();
        });

       $('#usr_join').click(function(e){
             console.log('btn_join clicked');
             join();
        });
	};

	var update = function(){
		
	};

    var submit = function(){
        console.log('submit');
        console.log('Userid : ' + usr_id.value);
        console.log('Password : ' + usr_pwd.value);
        var id  = usr_id.value;
        var pwd = usr_pwd.value;

        var data = { "id"  : id,
                     "pwd" : pwd 
                   };

        $.post("http://192.168.0.17:3000/users/login",
        {
            id: id,
            pwd: pwd
        },
        function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
        });

     };

    var join = function(){
        console.log('join');
        location.replace('register.html');
    };

    return {
        init: function () {
        	initialize();
        },

        update: function(){
        	update();
        },

        getObjects: function(){
        	var objects = [];
            objects.push({
                type: 'bitmap',
                data: background
            });

            return objects;
        },

        finish: function(){

        }
    };
};
