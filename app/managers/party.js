var Party = function () {
    var id = 0;

	var members = []; // members include master
    var master_id = null;

    var title = "";
    var desc = "";

	var initialize = function(ititle, idesc, master){
		title = ititle;
        desc = idesc;
        master_id = master;

        addMember(master);
	};

    var addMember = function(id){
        members.push(id);
    };

    var isMember = function(id){
        var result = false;

        $.each(members, function(i, value){
            if(value === id){
                result = true;
                return false;
            }
        });

        return result;
    };

	return {
        init: function (ititle, idesc, master) {
    		initialize(ititle, idesc, master);
        },

        addMember: function(id){
            return addMember(id);
        },

        isMember: function(id){
            return isMember(id);
        },

        getMembers: function(){
            return {
                master: master_id,
                members: members
            };
        }
    };
}