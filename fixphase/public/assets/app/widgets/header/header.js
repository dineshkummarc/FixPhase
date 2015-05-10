define(
    [
        "text!widgets/header/header.html!strip",
        "widget",
        'jquery',
        "css!widgets/header/header.css"
    ],
    function (html, Widget, $) {

        return new Widget({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                //register any DOM events here, like onClick
                var self = this;

                var username = content.find('.username').text();

                var dropDownMenu = content.find('.project-menu');
                var projectElement = content.find('.project-element');

                var addProjectBtn = content.find('.add-project-btn');
                var addProjectForm = content.find('.addNewProject');

                var closeDialog = content.find('.close-dialog');
                var searchField = content.find('.search-box');

                var inviteForm = content.find('.invite');

                var url = "user.json";

                //invite to project POPUP
                inviteForm.dialog({
                    autoOpen: false,
                    show: {
                        effect: "fade"
                    },
                    modal: true,
                    draggable: false,
                    fluid: true,
                    resizable: false,
                    hide: {
                        effect: "fade"
                    },
                    Close: function () {
                        $(this).dialog("close");
                    },
                    Continue: function () {
                        $(this).dialog("close");
                    }
                });

                $.getJSON(url, function (responese) {
                    $.each(responese, function (index, user) {
                        if(user.username==userID){
                            $.each(user.projects, function (projectIndex,projectName) {
                                //create new list item
                                var project = $('<li/>');
                                project.prop("class","project-element");

                                //create new project link
                                var project_link = $('<a/>',{href:"#"});

                                //create new invite button for each project
                                var invite_btn = $('<button/>',{type:"button" , class:"add-btn"});

                                invite_btn.click(function () {
                                    inviteForm.dialog("open");
                                });

                                invite_btn.addClass("btn btn-default");  //new class for styling
                                invite_btn.text("+");

                                //get project name
                                var projectN = user.projects[projectIndex].project;

                                //append name of each project to the project link
                                project_link.text(projectN);

                                //append the project link to the list item then append the invite button
                                project.append(project_link);
                                project.append(invite_btn);

                                //append the list item after the search box
                                $('.project-menu li:eq(1)').after(project);
                            });
                        }
                    });
                });

                content.find('.dropdown-toggle').click(function () {
                    content.find('.project-menu').slideToggle("fast");
                    content.find('.search-result').hide();
                });


                //create new project POPUP
                addProjectForm.dialog({
                    autoOpen: false,
                    show: {
                        effect: "fade"
                    },
                    modal: true,
                    draggable: false,
                    fluid: true,
                    resizable: false,
                    hide: {
                        effect: "fade"
                    },
                    Close: function () {
                        $(this).dialog("close");
                    },
                    Continue: function () {
                        $(this).dialog("close");
                    }
                });

                addProjectBtn.click(function () {
                    addProjectForm.dialog("open");
                });

                addProjectForm.submit(function (e) {
                    e.preventDefault();

                });

                //search function
                searchField.keyup(function(){
                    var filter = $(this).val();
                    var count = 0;
                    var Exp = new RegExp(filter, "i");

                    content.find(".dropdown-menu .project-element").each(function(){

                        if ($(this).text().search(Exp) < 0) {
                            $(this).fadeOut();
                        }
                        else {
                            $(this).show();
                            count++;
                        }
                    });
                });

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

                console.log("Header-Widget: called start");
            },

            exit: function(){
                console.log("Header-Widget: called exit");
            }
        });

    }
);