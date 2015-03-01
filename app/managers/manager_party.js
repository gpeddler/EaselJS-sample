var ManagerParty = function () {
	var parties = [];

	var initialize = function(){
		parties = [];
	};

    var addParty = function(party){
        parties.push(party);
    };

    var getMyParty = function(id){
        result = null;

        $.each(parties, function(i, party){
            if(party.isMember(id)){
                result = party.getMembers();
                return false;
            }
        });

        return result;
    };

	return {
        init: function () {
    		initialize();
        },

        addParty: function(party){
            addParty(party);
        },

        getMyParty: function(id){
            return getMyParty(id);
        }
    };
}