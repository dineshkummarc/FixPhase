define(["store"], function(Store){

    var currentTodo = null;
    return new Store({
        ajaxMethods:{

            //call getTodos(obj,data,success,fail)
            //success is a callback called with data returned from server
            //fail is called with error msg
            ajaxGetTodos: {
                type: "GET",
                url: "todoapp",
                cache: {name: "projects", array: true}
            }


        },

        methods: {
            getCurrentTodo: function()
            {

            }
        },

        //on setup
        setup: function () {
            this.observeURL(/example\/todo\//, function () {

            });
        },


        //on exit
        exit: function () {

        }

    });
});