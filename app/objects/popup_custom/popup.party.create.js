var POPUP_PARTY_CREATE = function(action_create, action_cancel){
	
	var create = function(){
		var popup = new Popup();
		
		var label_title = new createjs.Text("Text", "15px Arial", "#333333");
		var label_desc = new createjs.Text("Text", "15px Arial", "#333333");

		label_title.text = "파티제목";
		label_desc.text = "파티설명";

		label_title.x = 25;
		label_title.y = 60;

		label_desc.x = 25;
		label_desc.y = 100;

		var element_title = $("<input type='text' id='input_title'>");
        element_title.css('position', 'absolute')
            .css('left', '0')
            .css('top', '0')
            .css('width', '370px');

        var element_content = $("<textarea type='text' id='input_desc'></textarea>");
        element_content.css('position', 'absolute')
            .css('left', '0')
            .css('top', '0')
            .css('width', '370px')
            .css('height', '100px');

        $('body').append(element_title);
        $('body').append(element_content);

        var input_title = new createjs.DOMElement(element_title.attr('id'));
        var input_content = new createjs.DOMElement(element_content.attr('id'));

        input_title.x = 90;
        input_title.y = 60;

        input_content.x = 90;
        input_content.y = 100;

        var btn_create = new Button();
        btn_create.init('assets/img/popup/btn_check.png', action_create, { x : 348, y : 220, width : 59, height : 25 });  

        var btn_cancel = new Button();
        btn_cancel.init('assets/img/popup/btn_cancel.png', action_cancel, { x : 420, y : 220, width : 59, height : 25 });  

		popup.init("파티생성", 200);
		popup.addText(label_title);
		popup.addText(label_desc);
		popup.addInput(input_title);
		popup.addInput(input_content);
		popup.addButton(btn_create);
		popup.addButton(btn_cancel);

		return popup;
	};

	return create();
}