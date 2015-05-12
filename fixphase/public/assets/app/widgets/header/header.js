define(
    [
        "text!widgets/header/header.html!strip",
        "widget",
        'jquery',
        "css!widgets/header/header.css",
        "css!smoothness",
        "jquery-ui/dialog"
    ],
    function (html, Widget, $) {

        return new Widget({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                //register any DOM events here, like onClick
                var self = this;

                var userID = content.find('#username').text();

                var newProjectForm = content.find('#newProjectForm');
                var inviteForm = content.find('#inviteForm');

                var dropDownMenu = content.find('#project-menu');
                var projectElement = content.find('.project-element');

                var addProjectBtn = content.find('#add-project-btn');
                var addProjectPopup = content.find('#addNewProject');

                var closeDialog = content.find('.close-dialog');
                var searchField = content.find('#search-box');

                var invitePopup = content.find('#invite');
                var projectsList = content.find('#project-list');

                var url = "/assets/app/widgets/header/user.json";

                var gotJson = false;
                invitePopup.dialog({
                var haveJson = false;
                var project_open = content.find('#project-open');
                project_open.click(function(){
                    if(!haveJson)
                    {
                        $.getJSON(url, function (responese) {
                            haveJson = true;
                            $.each(responese, function (index, projects) {

                                //create new list item
                                var project = $('<li/>');
                                project.prop("class","project-element");

                                //create new project link
                                var project_link = $('<a/>',{href:"#"});

                                //create new invite button for each project
                                var invite_btn = $('<button/>',{type:"button" , class:"add-btn"});

                                invite_btn.click(function () {
                                    invitePopup.dialog("open");
                                    dropDownMenu.slideToggle("fast");
                                });

                                invite_btn.addClass("btn btn-default");  //new class for styling
                                invite_btn.text("+");

                                //get project name
                                var projectN = projects.pname;

                                //append name of each project to the project link
                                project_link.text(projectN);

                                //append the project link to the list item then append the invite button
                                project.append(project_link);
                                project.append(invite_btn);
                                projectsList.append(project);
                            })
                        }).fail(function () {
                            haveJson = true;
                            var failRes = $('<li/>');
                            failRes.prop("class", "fail-msg");
                            var failTxt = $('<p/>');

                            failRes.hover(function () {
                                failRes.css("background-color", "#ffb5a4");
                            });

                            failTxt.text("Failed to fetch data from server.");
                            failRes.append(failTxt);

                            projectsList.append(failRes);
                        });
                    }
                });



                content.find('#projects').click(function () {
                    dropDownMenu.slideToggle("fast");
                });


                //create new project POPUP
                addProjectPopup.dialog({

                addProjectBtn.click(function () {
                    addProjectPopup.dialog("open");
                    dropDownMenu.slideToggle("fast");
                });

                newProjectForm.submit(function (e) {
                    e.preventDefault();

                });

                //search function
                searchField.keyup(function(){
                    var filter = $(this).val();
                    var count = 0;
                    var Exp = new RegExp(filter, "i");

                    content.find("#project-list li").each(function(){

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
                var addProjectPopup = content.find('#addNewProject');
                var invitePopup = content.find('#invite');
                addProjectPopup.dialog({
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

                invitePopup.dialog({
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
            },

            exit: function(){
                console.log("Header-Widget: called exit");
            }
        });

    }
);