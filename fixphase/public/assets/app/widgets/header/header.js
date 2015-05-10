/**
 * Created by Aya on 4/25/2015.
 */
//define(['jquery','text!widgets/header/header.html!'],function($){
$(document).ready(function () {
    var searchResult = $('.search-result');

    searchResult.hide();

    var userID = "Aya";
    var username = $('<a/>',{href:"#"});
    username.append(userID);
    $('.username').append(username);

    var dropDownMenu = $('.project-menu');
    var projectElement = $('.project-element');

    var addProjectBtn = $('.add-project-btn');
    var addProjectForm = $('.addNewProject');

    var closeDialog = $('.close-dialog');
    var searchField = $('.search-box');

    var inviteForm = $('.invite');



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

    $('.dropdown-toggle').click(function () {
        $('.project-menu').slideToggle("fast");
        $('.search-result').hide();
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

        $(".dropdown-menu .project-element").each(function(){

            if ($(this).text().search(Exp) < 0) {
                $(this).fadeOut();
            }
            else {
                $(this).show();
                count++;
            }
        });
    });

});
