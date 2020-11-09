define(
    [
        "text!pages/notFound/notFound.html!strip",
        "page",
        'jquery',
        "css!pages/notFound/notFound.css"
    ],
    function (html, Page, $){

        return new Page({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                //register any DOM events here, like onClick

                return content;
            },

            //all url observe goes here
            observeURLS: function () {

            },

            //called when the page is in view
            //you can fetch data and show them here on startup if you want
            start: function () {
                //access content
                var content = this.getContent();

                console.log("Notfound-Page: called start");
            },

            exit: function(){
                console.log("Notfound-Page: called exit");
            }
        });

    }
);