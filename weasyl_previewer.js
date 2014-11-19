var thumbfigs = document.getElementsByClassName("thumbnail");
var style = document.createElement("STYLE");
style.innerHTML = ".previewNox{width:300px;position:fixed;border-radius:10px;padding:5px;" +
	"background-color:#D6D6D6;border:2px dashed #A0A0A0;top:20px;left:20px;overflow:hidden;visibility:hidden}\n" +
	".previewAvatar{float:left;text-align:center;background-color:#9AA9AA;" + 
	"margin:4px;padding:4px;border:1px solid #222;border-radius:4px;}\n"  +
	".previewNox .tags a {padding:0 0.5em;height:1.4rem;line-height:1.4rem;color:#336979;}"
document.head.appendChild(style);

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
			
			floater.innerHTML = "<div class='previewAvatar'><img src='" 
			+ response.owner_media.avatar[0].url + "'><br><strong>" + response.owner + "</strong></div>"
				+ desco + "<br><div class='tags'>" + taglinks + "</div>";
		});
		
		thumb.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0].setAttribute("title", "");
	} else {
		floater.innerHTML = "Can't preview Character submissions, sorry.";
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
		floater.style.top = event.y + "px";
		if (event.x < (window.innerWidth - 320)) {
			floater.style.left = event.x + 40 + "px";
		} else {
			floater.style.left = (event.x - 340) + "px";
		}
	});
});