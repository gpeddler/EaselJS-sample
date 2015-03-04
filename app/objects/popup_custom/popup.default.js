var POPUP_DEFAULT = function(title, content){
	
	var create = function(){
		var popup = new Popup();
		
		var popup_text = new createjs.Text("Text", "15px Arial", "#666666");

		popup_text.lineWidth = 450;
		popup_text.lineHeight = 18;
		popup_text.maxWidth = 450;

		popup_text.text = content;

		popup_text.x = 26;
		popup_text.y = 60;

		console.log(popup_text.getBounds().height);

		popup.init(title, popup_text.getBounds().height + 20);
		popup.addText(popup_text);

		return popup;
	};

	return create();
}