	var editFlag = false;
var commentCount = 1;

	function editDesc() {
		var titleVal;
		var descVal;
		var projectVal;
		var versionVal;
		if(!editFlag)
		{
			editFlag = true;
			titleVal = $('#title p').text();
			descVal = $('#desc p').text();
			projectVal = $('#project p').text();
			versionVal = $('#version p').text();

			$('#desc').html("<div id='edesc'><textarea>"+descVal+"</textarea></div>");
			$('#title').html("<div id='etitle'><input type='text' value="+titleVal+"></div>");
			$('#project').html("<div id='eproject'><input type='text' value="+projectVal+"></div>");
			$('#version').html("<div id='eversion'><input type='text' value="+versionVal+"></div>");


			$('#buttonset').html("<button onclick='editDesc()'>Save</button>");

		}
		else {
			editFlag = false;
			descVal = $('#edesc textarea').val();
			titleVal = $('#etitle input').val();
			projectVal = $('#eproject input').val();
			versionVal = $('#eversion input').val();

			$('#edesc').html("<div id='desc'><p>"+descVal+"</p></div>");
			$('#etitle').html("<div id='title'><p>"+titleVal+"</p></div>");
			$('#eproject').html("<div id='project'><p>"+projectVal+"</p></div>");
			$('#eversion').html("<div id='version'><p>"+versionVal+"</p></div>");

			$('#buttonset').html("<button onclick='editDesc()'>Edit Defect</button>");

		}
	}

function addComment() {
	
	$("#comments #comments-section #"+commentCount+"").html('<p id="commentator">Ali Korayem</p><p id="commentText">'+commentCount+'</p>');
	$("#comments #comments-section #"+commentCount+"").html('<br>');
	$("#comments #comments-section #"+commentCount+"").html('<div id="'+(commentCount++)+'"></div>');
	
	
}
