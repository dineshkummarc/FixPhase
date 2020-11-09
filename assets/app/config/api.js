define([], {

    //---- User ----//

    /**
     * method: GET
     * expexted data: {user_id:11, name:''}
     */
    getUser: "/users",

    //---- Project ----//

    /**
     * method: GET
     * arguments: {user_id}
     * expected data: array of projects {id:{name: '', id: 11, owner:''}}
     */
    getProjects: "/projects",

    /**
     * method: GET
     * arguments: {user_id,pid}
     * expected data: array of projects {name: '', id: 11, owner:''}
     */
    getProject: "/projects",
    /**
     * method: POST
     * arguments: {user_id, name, summary}
     * expected data: new project id
     */
    createProject: "/projects",
    /**
     * method: POST
     * arguments: {user_id, pid, email, role}
     * expected data: empty object
     */
    inviteToProject:"/projects/contributors",

    /**
     * method: GET
     * arguments: {user_id,pid}
     * expected data: array of contributors {id: 11, username:''}
     */
    getContributors: "/projects/contributors",

    /**
     * method: GET
     * arguments: {user_id,pid}
     * expected data: string with summary
     */
    getSummary:"/projects/summary",

    /**
     * method: GET
     * arguments: {user_id,pid}
     * expected data:{
     *           ‘total_bugs’ : '',
     *           ‘submited_bugs’: '' ,
     *           ‘opened_bugs’ : '',
     *           ‘assigned_bugs’: '' ,
     *           ‘solved_bugs’ : '',
     *           ‘closed_bugs’ : ''
     *       }
     *
     */
    getStats:"/projects/statistics"


});