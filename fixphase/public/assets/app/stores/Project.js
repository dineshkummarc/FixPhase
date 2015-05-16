define(["store", "stores/User"], function(Store, User){


    var projects = null;
    var cur_project= null;
    var summary = null, contributors = null, stats = null;

    var projectChanged = function () {
            summary = null;
            contributors = null;
            stats = null;
    };
    // store object
    var Project = new Store({
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
                    return this.makeDonePromise(caller, true, projects)
                }

                //otherwise fetch result from server
                return this.get({
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

                        projects = returnedData;
                        this.fireChange(this.properties.PROJECTS, true, {type:"change",data:projects}, caller);
                        return projects;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
                    }
                });
            },

            getProject: function (id, caller, data, disableCache) {
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,

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
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
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
                            projects[project.id] = project;
                            this.fireChange(this.properties.PROJECTS, false, {type: "add", data: project}, null);
                        }
                        //return the data
                        return project;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
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
                            return returnedData.message;
                        }
                        return null;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
                    }


                });
            },


            getContributors: function (id, caller, data, disableCache) {
                if(contributors)
                {
                    return this.makeDonePromise(caller, true, contributors);
                }
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,

                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {

                            return returnedData.message;
                        }
                        return returnedData;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
                    }
                });
            },

            getSummary: function (id, caller, data, disableCache) {
                if(summary)
                {
                    return this.makeDonePromise(caller, true, summary);
                }
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,

                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {

                            return returnedData.message;
                        }
                        return returnedData;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
                    }
                });
            },

            getStats: function (id, caller, data, disableCache) {
                if(stats)
                {
                    return this.makeDonePromise(caller, true, stats);
                }
                return this.get({
                    id: id,                      // function identifier
                    caller: caller,              // object calling this function
                    data: data,                  // query to be sent to server,

                    filterDoneArguments: function (success, returnedData) {
                        // if error from server return error msg
                        if(!success)
                        {
                            return returnedData.message;
                        }
                        return returnedData;
                    },
                    filterFailedArguments : function (x, msg) {
                        return;
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
                        projectChanged();
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
                                    projectChanged();
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

    return Project;

});