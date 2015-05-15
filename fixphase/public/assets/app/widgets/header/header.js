define(
    [
        "text!widgets/header/header.html!strip",
        "widget",
        'jquery',
        "stores/Project",
        "css!widgets/header/header.css",
        "css!smoothness",
        "jquery-ui/dialog"
    ],
    function (html, Widget, $, Project) {

        return new Widget({

            usedStores: [],
            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                //register any DOM events here, like onClick
                var self = this;

                var newProjectForm = content.find('#newProjectForm');
                var inviteForm = content.find('#inviteForm');

                var dropDownMenu = content.find('#projects-menu-container');
                var projectElement = content.find('.project-element');

                var projectSubmit = content.find("#submitPro");
                var addProjectBtn = content.find('#project-add');
                var addProjectPopup = content.find('#addNewProject');

                var closeDialog = content.find('.close-dialog');
                var searchField = content.find('#search-box');

                var invitePopup = content.find('#invite');
                var inviteSubmit = content.find("#submit-inv");
                var projectsList = content.find('#project-list');

                var projectTitle = content.find('#project-current');
                var error = $("<li/>", {id: "error-cont"});

                var url = "/assets/app/widgets/header/user.json";

                var logout= content.find("#logout");

                var gotJson = false;
                var haveJson = false;
                var projectToggleButton = content.find('#projects-toggle-button');
                projectToggleButton.click(function(){
                    if(!haveJson)
                    {
                        response.detach();
                        Project.getProjects().done(function (success, response) {
                            if(!success)
                            {
                                projectsList.append(response);
                                return;
                            }
                            response.detach();
                            haveJson = true;
                            $.each(response, function (id, project) {

                                //create new list item
                                var project = $('<li/>');
                                project.prop("class","project-element");

                                //set onclick project
                                project.click(function (ev) {
                                    var obj = $(ev.target);
                                    //execute if we didnt click the invite button
                                    if(!obj.hasClass("invite-button") && !obj.parent().hasClass("invite-button"))
                                    {
                                        self.goToURL("/project/"+project.id);
                                    }

                                });

                                //create new project link
                                var project_link = $('<button/>',{type:"button", class:"clear-btn project-name"});

                                //create new invite button for each project
                                var invite_btn = $('<button/>',{type:"button", class:"clear-btn invite-button"});
                                invite_btn.tooltip({placement: "right", title:"Send invitation"});

                                invite_btn.append($('<span/>', {class:"glyphicon glyphicon-send"}));
                                invite_btn.click(function (ev) {
                                    inviteSubmit.text("Invite to " + project.name);
                                    inviteSubmit.attr("data", project.id);
                                    invitePopup.dialog("open");

                                });


                                //get project name
                                var projectN = project.name;

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

                //when submitting an invitation
                inviteSubmit.click(function () {
                    var projectId = inviteSubmit.attr("data");
                    //invite code here
                    invitePopup.dialog("close");
                });

                //when submitting new project
                projectSubmit.click(function () {
                    //add project code goes here
                    addProjectPopup.dialog("close");
                });

                addProjectBtn.click(function () {
                    addProjectPopup.dialog("open");
                });

                newProjectForm.submit(function (e) {
                    e.preventDefault();

                });

                //search function
                searchField.keyup(function(){
                    var filter = $(this).val();
                    if(filter.length == 0)
                    {
                        content.find("#project-list li").show();

                    }
                    else{

                        var Exp = new RegExp("^"+filter, "i");

                        content.find("#project-list li").each(function(){

                            if ($(this).text().search(Exp) < 0) {
                                $(this).fadeOut();
                            }
                            else {
                                $(this).show();
                            }
                        });
                    }
                });


                //logout
                logout.click(function () {
                    window.location.href = "/Login/logout";
                });


                //show dropdown in right position and with right size
                //because parent has overflow:hidden

                var projectDropdown = content.find("#projects-dropdown");
                projectToggleButton.click(function (ev){
                    var dropDownTop = projectToggleButton.offset().top + projectToggleButton.outerHeight();
                    projectDropdown.css('top', dropDownTop + "px");
                    projectDropdown.css('left', projectToggleButton.offset().left + "px");
                    projectDropdown.css('width', projectToggleButton.outerWidth()+"px");
                });

                //when click on search box dont close drop down
                content.find("#search-box").click(function (ev) {
                    ev.stopPropagation();
                });

                //when browser size change resize dropdown
                $(window).resize(function () {
                    projectDropdown.css('width', projectToggleButton.outerWidth()+"px");
                });

                //set hover color when dropdown is active
                var projectsToggleDiv = content.find("#projects-toggle-div");
                projectsToggleDiv.on("shown.bs.dropdown", function () {
                    projectToggleButton.attr("id", "projects-toggle-button-active");
                });
                projectsToggleDiv.on("hidden.bs.dropdown", function () {
                    projectToggleButton.attr("id", "projects-toggle-button");
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
                content.find('[data-toggle="tooltip"]').tooltip();




            },

            exit: function(){
            }
        });

    }
);