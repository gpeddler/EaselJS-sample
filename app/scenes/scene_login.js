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

    var btn_join = $("<input type = 'submit' id = 'usr_join' value= 'Join' onClick='join()'>");
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
        
        $.post("http://growingdever.cafe24.com:3000/users/login",
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
        console.log('Userid : ' + usr_id.value);
        console.log('Password : ' + usr_pwd.value);
        var id  = usr_id.value;
        var pwd = usr_pwd.value;
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

/*
    var input_id    = document.createElement('input');
        input_id.id = 'usr_id';
        input_id.placeholder = ' Username';
        input_id.style.position = 'absolute';
        input_id.style.backgroundColor = '#d3ffce';
        input_id.style.top  = '100px';
        input_id.style.left = '100px';

    var input_pwd    = document.createElement('input');
        input_pwd.id = 'usr_pwd';
        input_pwd.placeholder = ' Password';
        input_pwd.style.position = 'absolute';
        input_pwd.style.backgroundColor = '#d3ffce';
        input_pwd.style.top  = '100px';
        input_pwd.style.left = '100px';

*/