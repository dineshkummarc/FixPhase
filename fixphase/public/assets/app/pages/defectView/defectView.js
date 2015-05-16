define(
    [
        "text!pages/defectView/defectView.html!strip",
        "page",
        'jquery',
        "css!pages/defectView/defectView.css",
    ],
    function (html, Page, $) {
        var editFlag = false;
        
        return new Page({

            //a must have property where content are setup
            makeContent: function () {
                var content = $(($.parseHTML($.trim(html)))[0]);
				
                //save this variable to use it in events callback
                var self = this;
                //register any DOM events here, like onClick
                content.find("#defectView-page-edit").click(function () {
					
					
					var generatedHTML;
					var titleVal;
					var releaseNameVal;
					var releaseVersionVal;
					var descVal;
					var severityVal;
					var priorityVal;
					var productVal;
					
					if(!editFlag)
					{
						editFlag = true;
						titleVal = content.find('#title td').text();
						releaseNameVal = content.find("#release-name td").text();
						releaseVersionVal = content.find("#release-version td").text();
						descVal = content.find('#defectView-page-descriptionText').text();
						content.find("#defectView-page-descriptionText").html("<div id='edit-fieldDiv'><textarea id='edit-field' style='height:300px; resize:none;' class='form-control' rows='3'>"+descVal+"</textarea></div>");
						content.find("#defectView-page-edit").html("<div id='defectView-page-save'><button type='button' id='defectView-page-editbutton' class='btn btn-xs btn-success'><span class='glyphicon glyphicon-ok'></span></button></div>");
					}
					else {
						editFlag = false;
						content.find("#edit-fieldDiv").html("<div id='defectView-page-descriptionText'>"+content.find("#edit-field").val()+"</div>");
						content.find("#defectView-page-save").html("<div id='defectView-page-edit'><button type='button' id='defectView-page-editbutton' class='btn btn-xs btn-primary'><span class='glyphicon glyphicon-pencil'></span></button></div>");
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


