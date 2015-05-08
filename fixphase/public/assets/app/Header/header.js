/**
 * Created by Aya on 4/25/2015.
 */
$(document).ready(function () {
    $('.search-result').hide();

    var userID = "Aya";
    var username = $('<a/>',{href:"#"});
    username.append(userID);
    $('.username').append(username);

    var url = "user.json";

    $.getJSON(url, function (responese) {
        $.each(responese, function (index, user) {
            if(user.username==userID){
                $.each(user.projects, function (projectIndex,projectName) {
                    var project = $('<li/>');
                    var project_link = $('<a/>',{href:"#"});
                    var projectN = user.projects[projectIndex].project;
                    project_link.append(projectN);
                    project.append(project_link);
                    $('.dropdown-menu').append(project);
                    //console.log(user.projects.length);
                    if(projectIndex==2){
                        return false;
                    }
                });
            }
        });
    });

    $('.dropdown-toggle').click(function () {
        $('.dropdown-menu').slideToggle("fast");
        $('.search-result').hide();
    });


    var searchResult = $('<p/>');

    $('.search-box').keypress(function (e) {
        if (e.which == 13) {
            $.getJSON(url, function (responese) {
                $.each(responese, function (index, user) {
                    if(user.username==userID){
                        $.each(user.projects, function (projectIndex,projectName) {
                            var projectN = user.projects[projectIndex].project;
                            if($('.search-box').val() == projectN){
                                var validResult = $('.searchResult');
                                validResult.text(projectN+" 'Search result.'");
                                validResult.prop("href","#");
                                $('.search-result').show();
                                $('.search-box').val('');
                                return false;
                            }
                            else if(projectIndex==user.projects.length-1){
                                var invalidResult = $('.searchResult');
                                invalidResult.text("No such project");
                                invalidResult.removeAttr("href");
                                $('.search-result').show();
                                $('.search-box').val('');
                                return false;
                            }
                            else
                                return true;
                        });

                    }
                });
            });
        }

    });
});