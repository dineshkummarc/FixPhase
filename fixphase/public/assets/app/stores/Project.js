define(["store"], function(Store){

    var projects = null;

    // store object
    return new Store({
        //ajaxMethod property holds all methods that will do ajax requests
        //ajax methods should be named according to properties in config/api
        ajaxMethods:{
            /**
             * Get all projects
             * @param {String}  id           - An identifier for this function passed implicitly by the store class.
             * @param {object}  caller       - The caller object usually "this" is given
             * @param {object}  data         - query arguments to be sent in request (maybe null)
             * @param {boolean} disableCache - Set to true to disable cache and force reload from server.
             *
             * @return {Object} - a promise object.
             *
             * Usage:
             *                     getProjects(caller,data).done(donefunc).fail(failfunc)
             *
             * Done & Fail functions:
             *     - done func:
             *                 info -> called when ajax request succeeded and server response is back
             *                 arguments ->  success  : indicated whether the server responded with an error
             *                               data     : holds the error object, if success is false, otherwise, holds
             *                                         the data requested
             *     - fail func:
             *                info -> this is called when the ajax request fails and didnt reach server
             *                arguments ->  errorStatus : "timeout" , "" ....
             */
            getProjects: function (id, caller, data, disableCache) {
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
                     * Track the cache of this request so as to ignore recently finished requests if the cache already
                     * has a value. A function is used to make a closure that tracks the cache object.
                     * @returns {Object} - project cache
                     */
                    cache: function () {
                        return projects;
                    },
                    /**
                     * This is called to filter the passed data argument to the callback of the promise returned,
                     * when the promise has done.
                     *
                     * @param {boolean} cahceRequest   - Indicate if this is a request that should get the cache
                     * @param {boolean} success        - indicate whether the data argument is an error object or not
                     * @param {object}  data           - holds data returned from server (either error object or
                     *                                   actual data)
                     * @return {Object}                - argument passed to done promise callbacks as the data argument
                     */
                    filterDoneArguments: function (cacheRequest, success, data) {
                        // if error from server return error msg
                        if(!success)
                        {
                            return data;
                        }
                        // check if we this is a new get request not a cache
                        if(!cacheRequest)
                        {
                            projects = data;
                        }
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

        createProject: function (id, caller, data) {
            return this.set({
                id: id,
                caller: caller,
                data: data,
                method: "PUT",

                filterDoneArguments: function (success, data) {
                    //if failed to create
                    if(!success)
                    {
                        return data;
                    }
                    //if succeeded then check if we already fetched todos
                    if(projects)
                    {
                        //if so update it with the new item
                        projects.push(data);
                    }
                    //return the data
                    return data;
                }


            });
        },

        //on setup
        setup: function () {
            this.observeURL(/project\/.+/, function (url, urlPath, args) {
                //if we have projects
                if(projects)
                {

                }
            });
        },

        //on exit
        exit: function () {

        }

    });
});