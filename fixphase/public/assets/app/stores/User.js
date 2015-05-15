define(["store"], function(Store){

    var projects = null;

    // store object
    return new Store({
        //ajaxMethod property holds all methods that will do ajax requests
        //ajax methods should be named according to properties in config/api
        ajaxMethods:{

            getUser: function (id, caller, data, disableCache) {
                disableCache = !!disableCache;
                //if we already have projects and no disableCache return a resolved promise
                if(projects && !disableCache)
                {
                    return this.makeResolvedPromise(caller, true, projects)
                }

                //otherwise fetch result from server
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,
                    disableCache: disableCache,  // indicate force reload
                    /**
                     * This is called to filter the passed data argument to the callback of the promise returned,
                     * when the promise has done.
                     *
                     * @param {boolean} success        - indicate whether the data argument is an error object or not
                     * @param {object}  returnedData           - holds data returned from server (either error object or
                     *                                   actual data)
                     * @return {Object}                - argument passed to done promise callbacks as the data argument
                     */
                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {
                            if(returnedData.id == Store.prototype.Errors.USER_ID_TAMPERED){
                                return "We dont server hackers."
                            }

                            return "Uknown error of id " + data.id;
                        }

                        projects = returnedData;
                        this.fireChange(this.properties.PROJECTS, true, projects);
                        return projects;
                    },

                    /**
                     * This is called to filter the passed errormsg argument to the callback of the promise returned,
                     * when the promise has failed
                     *
                     * @param   {object} jqXHR     - jquery XHR object
                     * @param   {string} statusMsg - holds data returned from server (either error msg or actual data)
                     * @returns {string}           - argument passed to failed promise callbacks as the data argument
                     */
                    filterFailedArguments: function (jqXHR, statusMsg) {
                        return statusMsg;
                    }
                });
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