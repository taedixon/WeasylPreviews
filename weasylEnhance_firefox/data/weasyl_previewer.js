/***************************
	PREVIEW_THUMBS
	+ FIREFOX
***************************/
var thumbfigs = document.getElementsByClassName("thumbnail");

function loadPreview(sub_id, floater, thumb) {
	if (sub_id) {
		jQuery.ajax({url:"/api/submissions/" + sub_id + "/view"}).done(function(response) {
			var desco = response.description;
				var split = desco.split(/\s+/);
			if (split.length > 50) {
				desco = "";
				for (i in split) {
					desco += split[i] + " ";
					if (i >= 50) {
						desco += "<em>[...]</em>";
						break;
					}
				}
			}
			
			var taglinks = ""
			for (tagnum in response.tags) {
				taglinks += "<a>" + response.tags[tagnum] + "</a>";
			}
			
			var htmlcontent = "<div class='previewAvatar'><img src='" 
			+ response.owner_media.avatar[0].url + "'><br><strong>" + response.owner + "</strong></div>"
				+ desco + "<br><div class='tags'>" + taglinks + "</div>";
			floater.innerHTML = htmlcontent;
		});
		
		thumb.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0].setAttribute("title", "");
	} else {
		var link = thumb.getElementsByTagName("A")[0].getAttribute("href");
		if (/\/character\//.test(link)) {
			floater.innerHTML = "Can't preview Character submissions at this time, sorry.";
		} else if (/\/journal\//.test(link)) {
			floater.innerHTML = "Can't preview Journals at this time, sorry.";
		} else {
			floater.innerHTML = "I don't know what this is but I can't preview it anyway.";
		}
	}
	floater.style.visibility = "visible";
}

Array.prototype.forEach.call(thumbfigs, function(elem, index, arr) {
	var thumb = elem.getElementsByClassName("thumb")[0];
	var sub_id= thumb.getAttribute("data-id");
	var floater = document.createElement("DIV");
	
	thumb.loaded = false;
	
	floater.setAttribute("class", "previewNox");
	
	document.body.appendChild(floater);
	
	thumb.addEventListener("mouseover", function(event) {
		if (!thumb.loaded) {
			thumb.preview_timeout = setTimeout(function() 
				{loadPreview(sub_id, floater, thumb); thumb.loaded = true;}, 1000);
		} else {
			floater.style.top = event.y + "px";
			floater.style.visibility = "visible";
			
			if (event.x < (window.innerWidth - 320)) {
				floater.style.left = event.x + 40 + "px";
			} else {
				floater.style.left = (event.x - 340) + "px";
			}
		}
	});
	
	thumb.addEventListener("mouseout", function(event) {
		if (!thumb.loaded) {
			clearTimeout(thumb.preview_timeout);
		}
		floater.style.visibility = "hidden";
	});
	
	thumb.addEventListener("mousemove", function(event) {
		floater.style.top = event.clientY + "px";
		if (event.clientX < (window.innerWidth - 320)) {
			floater.style.left = event.clientX + 40 + "px";
		} else {
			floater.style.left = (event.clientX - 340) + "px";
		}
	});
});