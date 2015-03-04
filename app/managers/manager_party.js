var ManagerParty = function () {
	var parties = [];

	var initialize = function(){
		parties = [];
	};

    var createParty = function(ititle, idesc, master){
        if(getMyParty(master) === null){
            var party = new Party();
            party.init(ititle, idesc, master);

            parties.push(party);
            return true;
        }else{
            return false;
        }
        
    };

    var breakMyParty = function(id){
        key = -1;

        $.each(parties, function(i, party){
            if(party.isMember(id)){
                key = i;
                return false;
            }
        });

        if(key !== -1){
            parties.splice(key, 1);
        }
    }

    var getMyParty = function(id){
        result = null;

        $.each(parties, function(i, party){
            if(party.isMember(id)){
                result = party;
                return false;
            }
        });

        return result;
    };

	return {
        init: function () {
    		initialize();
        },

        createParty: function(ititle, idesc, master){
            return createParty(ititle, idesc, master);
        },

        breakMyParty: function(id){
            breakMyParty(id);
        },

        getMyParty: function(id){
            return getMyParty(id);
        }
    };
}