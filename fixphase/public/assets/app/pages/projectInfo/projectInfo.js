define(
    [
        "text!pages/projectInfo/projectInfo.html!strip",
        "page",
        'jquery',
        "stores/Project",
        "stores/User",
        "css!pages/projectInfo/projectInfo.css",
    ],
    function (html, Page, $, Project, User) {
        var error_class = "error-cont";
        var showError = function (container, msg) {
            var err = $("<span/>", {class: error_class});
            err.text(msg);
            container.append(err);
        };
        var removeError = function(container)
        {
            container.remove(".error-cont");
        };
        var fetchSummary = function (self,content, project) {
            var summaryTitle = content.find("#project-info-summary-title");
            var summaryArea = content.find("#project-info-page-middle-section");
            //get user id
            User.getUser(self)
                .done(function (suceess, user) {
                    if(!suceess)
                    {
                        showError(summaryTitle,user);
                        return;
                    }

                    Project.getSummary(self,{user_id:user.user_id, pid: project.id})
                        .done(function (success, summary) {
                            if(!success)
                            {
                                showError(summaryTitle,summary)
                                return;
                            }
                            summaryArea.text(summary);
                        })
                        .fail(function () {
                            showError(summaryTitle,"Failed to connect to server.")
                        });

                })
                .fail(function (msg) {
                    showError(summaryTitle,"Failed to connect to server.")
                });
        };

        var fetchStats = function (self,content, project) {
            var statsTitle = content.find("#project-info-statistics-title");

            var solved = content.find("#project-solved-bugs");
            var opened = content.find("#project-opened-bugs");
            var assigned = content.find("#project-assigned-bugs");
            var total = content.find("#project-total-bugs");
            var closed = content.find("#project-closed-bugs");

            //get user id
            User.getUser(self)
                .done(function (suceess, user) {
                    if(!suceess)
                    {
                        showError(statsTitle,user);
                        return;
                    }

                    Project.getStats(self,{user_id:user.user_id, pid: project.id})
                        .done(function (success, stats) {
                            if(!success)
                            {
                                showError(statsTitle,stats)
                                return;
                            }
                            solved.text(stats.solved_bugs);
                            closed.text(stats.closed_bugs);
                            opened.text(stats.opened_bugs);
                            total.text(stats.total_bugs);
                            assigned.text(stats.assigned_bugs);

                        })
                        .fail(function () {
                            showError(statsTitle,"Failed to connect to server.")
                        });

                })
                .fail(function (msg) {
                    showError(summaryTitle,"Failed to connect to server.")
                });


        };

        var fetchContrib = function (self,content, project) {
            var contributorTitle = content.find("#project-info-contributors-title");
            var contributorsArea = content.find("#project-info-page-right-section");
            //get user id
            User.getUser(self)
                .done(function (suceess, user) {
                    if(!suceess)
                    {
                        showError(contributorTitle,user);
                        return;
                    }

                    Project.getContributors(self,{user_id:user.user_id, pid: project.id})
                        .done(function (success, contributors) {
                            if(!success)
                            {
                                showError(contributorTitle,contributors)
                                return;
                            }

                            for(var i in contributors)
                            {
                                var pin = $("<div/>", {class:"pin"});
                                var imageCont = $("<div/>", {class:"col-md-2 col-sm-1 col-xs-1"});
                                var image = $("<img/>", {src:"/assets/images/empty.jpg"});
                                imageCont.append(image);

                                var user = $("<div/>", {class:"col-md-10 col-sm-10 col-xs-10 project-info-page-user"});
                                user.text(contributors[i].username);

                                pin.append(imageCont);
                                pin.append(user);
                                contributorsArea.append(pin);
                            }

                        })
                        .fail(function () {
                            showError(contributorTitle,"Failed to connect to server.")
                        });

                })
                .fail(function (msg) {
                    showError(contributorTitle,"Failed to connect to server.")
                });
        };

        var emptyContributers = function (content) {
            content.find("#project-info-page-right-section").empty();
        };

        return new Page({
            usedStores: [Project, User],

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
                return content;
            },


            //called when the page is in view
            //you can fetch data and show them here on startup if you want
            start: function () {
                console.log("ll");
                var content = this.getContent();
                Project.onChange(Project.properties.CUR_PROJECT, this, function (failed, project) {
                    if(!failed)
                    {
                        emptyContributers(content);
                        fetchSummary(this,content, project);
                        fetchStats(this,content, project);
                        fetchContrib(this,content, project);
                    }

                });

            },

            exit: function(){

            }
        });

    }
);