define(
    [
        "text!skeletons/basic/basic.html!strip",
        "skeleton",
        'jquery',
        "widgets/header/header",
        "css!skeletons/basic/basic.css"
    ],
    function (html, Skeleton, $, headerWidget) {

        //add widgets
        var addWidgets = function (content) {
            var headWidgetAContainer = content.find("#skeleton-basic-widget-header");
            headWidgetAContainer.append(headerWidget.getContent());
        };



        return new Skeleton({
            //used to set the used widgets
            usedWidgets: [headerWidget],

            //used tp set the content
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                //register any DOM events here, like onClicc

                addWidgets(content);
                return content;
            },

            //used to set the inject container
            injectContainer: function () {
                return this.getContent().find("#skeleton-basic-inject");
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