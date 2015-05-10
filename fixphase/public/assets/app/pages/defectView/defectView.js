define(
    [
        "text!pages/defectView/defectView.html!strip",
        "page",
        'jquery',
        "css!pages/defectView/defectView.css",
    ],
    function (html, Page, $) {
        var editFlag = false;
        var commentCount = 1;
        function addComment() {
            $("#comments #comments-section #"+commentCount+"").html('<p id="commentator">Ali Korayem</p><p id="commentText">'+commentCount+'</p>');
            $("#comments #comments-section #"+commentCount+"").html('<br>');
            $("#comments #comments-section #"+commentCount+"").html('<div id="'+(commentCount++)+'"></div>');
        }
        return new Page({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);

                //save this variable to use it in events callback
                var self = this;
                //register any DOM events here, like onClick
                content.find("#buttonset").click(function () {
					
					var titleVal;
					var descVal;
					var projectVal;
					var versionVal;
					if(!editFlag)
					{
						editFlag = true;
						titleVal = content.find('#title p').text();
						descVal = content.find('#desc p').text();
						projectVal = content.find('#project p').text();
						versionVal = content.find('#version p').text();

						content.find('#desc').html("<div id='edesc'><textarea>"+descVal+"</textarea></div>");
						content.find('#title').html("<div id='etitle'><input type='text' value="+titleVal+"></div>");
						content.find('#project').html("<div id='eproject'><input type='text' value="+projectVal+"></div>");
						content.find('#version').html("<div id='eversion'><input type='text' value="+versionVal+"></div>");


						content.find('#buttonset').html("<button onclick='editDesc()'>Save</button>");

					}
					else {
						editFlag = false;
						descVal = content.find('#edesc textarea').val();
						titleVal = content.find('#etitle input').val();
						projectVal = content.find('#eproject input').val();
						versionVal = content.find('#eversion input').val();

						content.find('#edesc').html("<div id='desc'><p>"+descVal+"</p></div>");
						content.find('#etitle').html("<div id='title'><p>"+titleVal+"</p></div>");
						content.find('#eproject').html("<div id='project'><p>"+projectVal+"</p></div>");
						content.find('#eversion').html("<div id='version'><p>"+versionVal+"</p></div>");

						content.find('#buttonset').html("<button onclick='editDesc()'>Edit Defect</button>");

					}
					
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

            },

            exit: function(){
            }
        });

    }
);


