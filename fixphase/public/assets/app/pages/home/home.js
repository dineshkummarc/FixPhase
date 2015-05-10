define(
    [
        "text!pages/home/home.html!strip",
        "page",
        'jquery',
        "css!pages/home/home.css",
    ],
    function (html, Page, $) {

        return new Page({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);

                return content;
            },

            //all url observe goes here
            observeURLS: function () {

            },

            //called when the page is in view
            //you can fetch data and show them here on startup if you want
            start: function () {

            },

            exit: function(){

            }
        });

    }
);