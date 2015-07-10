/***************************
	PREVIEW_THUMBS
	+ CHROME
***************************/

var prefs;

function loadPreview(sub_id, floater, thumb) {
	if (sub_id) {
		jQuery.ajax({url:"/api/submissions/" + sub_id + "/view"}).done(function(response) {
			var desco = response.description;
			
			//this wad of nonsense replaces usericon images
			//with the name of the  user
			desco = desco.replace(/<a[^>]*href="\/([^"]*)"[^>]*class="user-icon".*?<\/a>/g, " $1 ")
			//not ideal but they won't let me just throw the contents in as HTML
			//so this chops out the HTML
			desco = desco.replace(/<[^>]*>/g, " ");
			//is doing all these regex replacements healthy? idk.
			//probably a better way.
			desco = desco.replace(/&amp;/g, "&");
			desco = desco.replace(/&lt;/g, "<");
			desco = desco.replace(/&gt;/g, ">");
			
			var split = desco.split(/\s+/);
			if (split.length > 50) {
				desco = "";
				for (i in split) {
					desco += split[i] + " ";
					if (i >= 50) {
						desco += " [...]";
						break;
					}
				}
			}
			
						
			if (prefs.prevImage) {
				if (!response.media.cover) {
					var noImgHead = document.createElement("H2");
					noImgHead.appendChild(document.createTextNode("No image to preview"));
					floater.appendChild(noImgHead);
				} else {
					var imgDiv = document.createElement("DIV");
					imgDiv.setAttribute("class", "previewImgBox");
					var helper = document.createElement("SPAN");
					helper.setAttribute("class", "helper");
					imgDiv.appendChild(helper);
					var img = document.createElement("IMG");
					img.setAttribute("class", "previewImg");
					img.setAttribute("src", response.media.cover[0].url);
					imgDiv.appendChild(img);
					floater.appendChild(imgDiv);
				}
			}
			
			if (prefs.prevUser) {
				var previewDiv = document.createElement("DIV");
				previewDiv.setAttribute("class", "previewAvatar");
				
				var previewAv = document.createElement("IMG");
				previewAv.setAttribute("src", response.owner_media.avatar[0].url);
				previewDiv.appendChild(previewAv);
				previewDiv.appendChild(document.createElement("BR"));
				
				var previewOwnerName = document.createElement("STRONG");
				previewOwnerName.appendChild(document.createTextNode(response.owner));
				previewDiv.appendChild(previewOwnerName);
				floater.appendChild(previewDiv);
			}
			
			if (prefs.prevDesc) {
				floater.appendChild(document.createTextNode(desco));
				floater.appendChild(document.createElement("BR"));			
			}
			
			if (prefs.prevTags) {
				var tagdiv = document.createElement("DIV");
				tagdiv.setAttribute("class", "tags");
				for (tagnum in response.tags) {
					var taglink = document.createElement("A");
					taglink.appendChild(document.createTextNode(response.tags[tagnum]));
					tagdiv.appendChild(taglink);
				}			
				floater.appendChild(tagdiv);
			}
		});
		
	} else {
		var link = thumb.getAttribute("href");
		if (/\/character\//.test(link)) {
			floater.appendChild(document.createTextNode("Can't preview Character submissions at this time, sorry."));
		} else if (/\/journal\//.test(link)) {
			floater.appendChild(document.createTextNode("Can't preview Journals at this time, sorry."));
		} else {
			console.log("Unknown thumb type!!! ");
			floater.parentNode.removeChild(floater);
			return;
		}
	}
	floater.style.visibility = "visible";
}

function init(items) {
	prefs = items;
	var thumbfigs = document.getElementsByClassName("thumb-bounds");
	var boxwidth = 330;
	var mousebuf = 40;
	Array.prototype.forEach.call(thumbfigs, function(elem, index, arr) {
		var thumb = elem;
		if (!thumb) return;
		var sub_id = false;
		var hfparts = thumb.getAttribute("href").split("/");
		//at this time, only submissions have an API endpoint. So don't dick around with other stuff.
		if (hfparts[1] == "submission")
			var sub_id= hfparts[2];
		var floater = document.createElement("DIV");
		
		thumb.loaded = false;
		
		floater.setAttribute("class", "previewNox");
		
		document.body.appendChild(floater);
		
		thumb.addEventListener("mouseover", function(event) {
			if (!thumb.loaded) {
				thumb.preview_timeout = setTimeout(function() 
					{loadPreview(sub_id, floater, thumb); thumb.loaded = true;}, prefs.prevDelay);
			} else {
				floater.style.visibility = "visible";
			}
		});
		
		thumb.addEventListener("mouseout", function(event) {
			if (!thumb.loaded) {
				clearTimeout(thumb.preview_timeout);
			}
			floater.style.visibility = "hidden";
		});
		
		thumb.addEventListener("mousemove", function(event) {
			floater.style.top = (event.clientY-120) + "px";
			if (event.x < (window.innerWidth - boxwidth - mousebuf)) {
				floater.style.left = event.x + mousebuf + "px";
			} else {
				floater.style.left = (event.x - boxwidth - mousebuf) + "px";
			}
		});
	});
}

function getOptions() {
	chrome.storage.sync.get({
		shrinkLarge: true,
		prevDesc: true,
		prevTags: true,
		prevUser: true,
		prevImage: false,
		prevDelay: 1000
	}, init);
}

getOptions();