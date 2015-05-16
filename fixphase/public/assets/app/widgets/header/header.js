define(
    [
        "text!widgets/header/header.html!strip",
        "widget",
        'jquery',
        "stores/Project",
        "stores/User",
        "css!widgets/header/header.css",
        "css!smoothness",
        "jquery-ui/dialog"
    ],
    function (html, Widget, $, Project, User) {

        var addProjectEntry = function (self, user_id, projects, projectsList, invitePopup, inviteSubmit) {
            var project = $('<li/>');
            project.prop("class","project-element");

            //set onclick project
            project.click(function (ev) {
                self.goToURL("/projects/"+projects.id);

            });

            //create new project link
            var project_link = $('<button/>',{type:"button", class:"clear-btn project-name"});

            if(user_id == projects.owner)
            {
                //create new invite button for each project
                var invite_btn = $('<button/>',{type:"button", class:"clear-btn invite-button"});
                invite_btn.tooltip({placement: "right", title:"Send invitation"});

                invite_btn.append($('<span/>', {class:"glyphicon glyphicon-send"}));
                invite_btn.click(function (ev) {
                    inviteSubmit.text("Invite to " + projects.name);
                    inviteSubmit.attr("data", projects.id);
                    invitePopup.find("#invite-email").val("");
                    inviteSubmit.prop("disabled", true);
                    invitePopup.find(".error-cont").detach();
                    invitePopup.dialog("open");

                });
                project.append(invite_btn);
            }

            //append name of each project to the project link
            project_link.text(projects.name);
            //append the project link to the list item then append the invite button
            project.append(project_link);
            projectsList.append(project);
        };


        return new Widget({

            usedStores: [Project, User],
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
                var projectNameInput = content.find("#proName-input");
                var projectDescInput = content.find("#proDesc-input");


                var addProjectBtn = content.find('#project-add');
                var addProjectPopup = content.find('#addNewProject');

                var closeDialog = content.find('.close-dialog');
                var searchField = content.find('#search-box');

                var invitePopup = content.find('#invite');
                var inviteEmail = content.find('#invite-email');
                var inviteSubmit = content.find("#submit-inv");
                var projectsList = content.find('#projects-list');

                var projectTitle = content.find('#projects-current');


                var url = "/assets/app/widgets/header/user.json";

                var logout= content.find("#logout");

                var gotJson = false;
                var haveJson = false;
                var projectToggleButton = content.find('#projects-toggle-button');

                var errors = {
                    projects:  $("<li/>", {class: "error-cont"}),
                    addProject:$("<li/>", {class: "error-cont"}),
                    invite:$("<li/>", {class: "error-cont"})
                };
                var errorFunc = function (error, cont, msg) {
                    if(!msg){
                        msg = "Failed to connect to server."
                    }
                    error.text(msg);
                    cont.prepend(error);

                };

                var fetchProject = function (user_id){
                    Project.getProjects(self,{user_id:user_id})
                        .done(function (success, response) {
                            if(!success)
                            {
                                errorFunc(errors.projects, projectsList, response);
                                return;
                            }
                            errors.projects.detach();
                            haveJson = true;
                            $.each(response, function (id, projects) {
                                //create new list item
                                addProjectEntry(self,user_id, projects, projectsList, invitePopup, inviteSubmit);
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
                };
                projectToggleButton.click(function(){
                    if(!haveJson)
                    {
                        errors.projects.detach();
                        //get user id
                        User.getUser(self)
                            .done(function(success, data){
                                if(!success)
                                {
                                    errorFunc(data);
                                    return;
                                }
                                fetchProject(data.user_id);

                            })
                            .fail(function () {
                                errorFunc();
                            });
                    }
                });

                //when submitting an invitation
                inviteSubmit.click(function () {
                    var pid = inviteSubmit.attr("data");
                    var role = invitePopup.find("#invite-select-role").val();
                    errors.invite.detach();
                    User.getUser(this)
                        .done(function (success, data) {
                            if(!success)
                            {
                                errorFunc(errors.invite, invitePopup, data);
                                return;
                            }

                            Project.inviteToProject(self, {user_id: data.user_id, email: inviteEmail.val(),
                                pid: pid, role: role})
                                .done(function (success, returnedData) {
                                    if(!success)
                                    {
                                        errorFunc(errors.invite, invitePopup, returnedData);
                                        return;
                                    }
                                    invitePopup.dialog("close");
                                })
                                .fail(function () {
                                    errorFunc(errors.invite, invitePopup);
                                });
                        })
                        .fail(function () {
                            errorFunc(errors.invite, invitePopup);
                        });

                });

                //when submitting new project
                projectSubmit.click(function () {
                    errors.addProject.detach();
                    User.getUser(this)
                        .done(function (success, data) {
                            if(!success)
                            {
                                errorFunc(errors.addProject, addProjectPopup, data);
                                return;
                            }

                            Project.createProject(self, {user_id: data.user_id, name: projectNameInput.val(),
                                summary: projectDescInput.val()})
                                .done(function (success, returnedData) {
                                    if(!success)
                                    {
                                        errorFunc(errors.addProject, addProjectPopup, data);
                                        return;
                                    }
                                    addProjectPopup.dialog("close");
                                })
                                .fail(function () {
                                    errorFunc(errors.addProject, addProjectPopup);
                                });
                        })
                        .fail(function () {
                            errorFunc(errors.addProject, addProjectPopup);
                        });
                    //add project code goes here
                });
                
                //enabel disable project submit button
                projectDescInput.keyup(function () {
                    projectSubmit.prop('disabled', projectDescInput.val() == "" || projectNameInput.val() == "");
                });
                projectNameInput.keyup(function () {
                    projectSubmit.prop('disabled', projectDescInput.val() == "" || projectNameInput.val() == "");
                });

                inviteEmail.keyup(function () {
                    inviteSubmit.prop('disabled', inviteEmail.val() == "");
                });
                addProjectBtn.click(function () {
                    //clear current text
                    projectNameInput.val("");
                    projectDescInput.val("");
                    projectSubmit.prop('disabled',true);
                    addProjectPopup.dialog("open");

                });

                newProjectForm.submit(function (e) {
                    e.preventDefault();

                });

                content.find("#header-logo").click(function () {
                    self.goToURL("/");
                });
                //search function
                searchField.keyup(function(){
                    var filter = $(this).val();
                    if(filter.length == 0)
                    {
                        content.find("#projects-list li").show();

                    }
                    else{

                        var Exp = new RegExp("^"+filter, "i");

                        content.find("#projects-list li").each(function(){

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
                Project.onChange(Project.properties.CUR_PROJECT,this, function (failed, data) {
                    var name = "Projects";
                    if(!failed)
                    {
                        name = data.name;
                    }
                    content.find('#projects-current').text(name);
                });

                Project.onChange(Project.properties.PROJECTS, this, function (failed, data) {
                    if(!failed )
                    {
                        if(data.type == "add")
                        {
                            User.getUser(this).done(function(success, data2){
                                var projectsList = content.find('#projects-list');
                                var invitePopup = content.find('#invite');
                                var inviteSubmit = content.find("#submit-inv");
                                addProjectEntry(this,data2.user_id, data, projectsList, invitePopup, inviteSubmit);


                            });
                        }
                    }
                });



            },

            exit: function(){
            }
        });

    }
);