define(
    [
        "text!skeletons/basic/basic.html!strip",
        "skeleton",
        'jquery',
        "css!skeletons/basic/basic.css"
    ],
    function (html, Skeleton, $) {


        return new Skeleton({

            //used tp set the content
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);


                return content;
            },

            //used to set the inject container
            injectContainer: function () {
                return this.getContent().find("#skeleton-nav-inject");
            },

            //used each time this page is inserted to DOM
            start: function () {
                //access content
                var content = this.getContent();

            },

            exit: function(){
            }
        });

    }
);