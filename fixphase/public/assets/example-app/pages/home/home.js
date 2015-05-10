define(
    [
        "text!pages/home/home.html!strip",
        "page",
        'jquery',
        "css!pages/home/home.css"
    ],
    function (html, Page, $) {

        return new Page({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);

                //save this variable to use it in events callback
                var self = this;
                //register any DOM events here, like onClick
                content.find("#home-page-button").click(function () {
                    self.goToURL(content.find("#home-page-input").val());
                });


                return content;
            },

            //all url observe goes here
            observeURLS: function () {
                var content = this.getContent();

                //match "example/anything but slash"
                this.observeURL(/example\/[^/]/, function (url, urlPath, args) {
                    if(args.name)
                    {
                        content.find("p").text(args.name);
                    }
                })
            },

            //called when the page is in view
            //you can fetch data and show them here on startup if you want
            start: function () {
                //access content
                var content = this.getContent();

                console.log("Home-Page: called start");
            },

            exit: function(){
                console.log("Home-Page: called exit");
            }
        });

    }
);