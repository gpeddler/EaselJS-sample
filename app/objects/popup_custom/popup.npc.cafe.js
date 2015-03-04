var POPUP_NPC_CAFE = function(action_dot, action_cafe){
	
	var create = function(){
		var popup = new Popup();

		var btn_dot = new Button();
		btn_dot.init('assets/img/npc_cafe/btn_dot.png', action_dot, {x: 25, y: 65, width: 215, height: 134});

		var btn_cafe = new Button();
		btn_cafe.init('assets/img/npc_cafe/btn_cafe.png', action_cafe, {x: 260, y: 65, width: 215, height: 134});
	
		popup.init("NPC.카페지기", 160);
		popup.addButton(btn_dot);
		popup.addButton(btn_cafe);

		return popup;
	};

	return create();
}