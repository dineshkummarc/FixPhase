define(["store"], function(Store){

    var user = null;

    // store object
    return new Store({
        //ajaxMethod property holds all methods that will do ajax requests
        //ajax methods should be named according to properties in config/api
        ajaxMethods:{

            getUser: function (id, caller, data, disableCache) {
                if(user)
                {
                    return this.makeResolvedPromise(caller, true, user)
                }

                //otherwise fetch result from server
                var p = this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,
                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {
                            if(returnedData.id == Store.prototype.Errors.USER_ID_TAMPERED){
                                return "We dont server hackers."
                            }

                            return "Uknown error of id " + data.id;
                        }

                        user = returnedData;
                        return user;
                    },

                    filterFailedArguments: function (jqXHR, statusMsg) {
                        return statusMsg;
                    }
                });
                return p;
            }
        },

        //on setup
        setup: function () {

        },


        //on exit
        exit: function () {

        }

    });
});