define(["store", "stores/User"], function(Store, User){


    var projects = null;
    var cur_project= null;

    // store object
    return new Store({
        //access by this.properties.PROJECTS which represent the id that is needed to observe changes on projects.
        properties: [
            "PROJECTS",
            "CUR_PROJECT"
        ],

        ajaxMethods:{
            /**
             * Get all projects
             * @param {String}  id           - An identifier for this function passed implicitly by the store class.
             * @param {object}  caller       - The caller object usually "this" is given
             * @param {object}  data         - query arguments to be sent in request (maybe null)
             * @param {boolean} disableCache - Set to true to disable cache and force reload from server.
             *
             * the success return is an array of project objects {id: {}, id:{}}
             */
            getProjects: function (id, caller, data, disableCache) {
                //if we already have projects
                if(projects)
                {
                    return this.makeResolvedPromise(caller, true, projects)
                }

                //otherwise fetch result from server
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,
                    /**
                     * This is called to filter the passed data argument to the callback of the promise returned,
                     * when the promise has done.
                     *
                     * @param {boolean} success        - indicate whether the data argument is an error object or not
                     * @param {object}  returnedData   - holds data returned from server (either error object or
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
                        this.fireChange(this.properties.PROJECTS, true, {type:"change",data:projects}, caller);
                        return projects;
                    }
                });
            },

            getProject: function (id, caller, data, disableCache) {
                //otherwise fetch result from server
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,
                    /**
                     * This is called to filter the passed data argument to the callback of the promise returned,
                     * when the promise has done.
                     *
                     * @param {boolean} success        - indicate whether the data argument is an error object or not
                     * @param {object}  returnedData   - holds data returned from server (either error object or
                     *                                   actual data)
                     * @return {Object}                - argument passed to done promise callbacks as the data argument
                     */
                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {
                            if(returnedData.id == Store.prototype.Errors.UNAUTHORIZED ||
                                returnedData.id == Store.prototype.Errors.NOT_FOUND){
                                return null;
                            }

                            return "Uknown error of id " + data.id;
                        }

                        return returnedData;
                    }
                });
            },

            createProject: function (id, caller, data) {
                return this.set({
                    id: id,
                    caller: caller,
                    data: data,
                    method: "POST",

                    filterDoneArguments: function (success, returnedData) {
                        //if failed to create
                        if(!success)
                        {
                            return "Uknown error of id " + data.id;
                        }
                        //create new project
                        var project = {id: returnedData, owner: data.user_id, name: data.name};
                        //check if we have a projects list
                        if(projects)
                        {
                            projects.push(project);
                            this.fireChange(this.properties.PROJECTS, true, {type: "add", data: project}, null);
                        }
                        //return the data
                        return project;
                    }


                });
            },

            inviteToProject: function (id, caller, data) {
                return this.set({
                    id: id,
                    caller: caller,
                    data: data,
                    method: "POST",

                    filterDoneArguments: function (success, returnedData) {
                        //if failed to create
                        if(!success)
                        {
                            //data is the error msg
                            if(returnedData.id == Store.prototype.Errors.NOT_FOUND){
                                return "No user found with such email."
                            }

                            return "Uknown error of id " + returnedData.id;
                        }
                        return null;
                    }


                });
            }
        },


        //on setup
        setup: function () {
            this.observeURL(/projects\/.+/, function (url, urlPath, args) {
                //if we have projects
                //if we have the projects get it from them
                if(cur_project)
                {
                    if(cur_project.id == args.pid)
                        return;
                }
                if(projects)
                {
                    if(!projects[args.pid]){

                        this.fireChange(this.properties.CUR_PROJECT, true, {_empty:true}, null);
                        this.goToURL("/notfound");
                    }
                    else
                    {
                        cur_project = projects[args.pid];
                        this.fireChange(this.properties.CUR_PROJECT, false,cur_project , null);
                    }
                }
                else
                {
                    //get user id
                    User.getUser(this)
                        .done(function (success, data) {
                            //get project
                            this.getProject(this, {user_id:data.user_id, pid:args.pid})
                                .done(function (success, data) {
                                    //we reached server but we got an error so go to notfound
                                    if(!success)
                                    {
                                        this.fireChange(this.properties.CUR_PROJECT, true, {_empty:true}, null);
                                        this.goToURL("/notfound");
                                        return;
                                    }
                                    cur_project = data;
                                    this.fireChange(this.properties.CUR_PROJECT, false,cur_project , null);
                                })
                                .fail(function (x, msg) {
                                    this.fireChange(this.properties.CUR_PROJECT, true, null, null);
                                });
                        })
                        .fail(function(x, msg){
                            this.fireChange(this.properties.CUR_PROJECT, true, null, null);
                        });
                }
            });
        },

        //on exit
        exit: function () {

        }

    });
});