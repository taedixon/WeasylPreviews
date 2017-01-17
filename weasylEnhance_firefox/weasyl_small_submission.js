/***************************
	SHRINK_SUBMISSIONS
	+ CHROME
***************************/


function expandImage() {
	var art_view = document.getElementById("detail-art");
	var bttn = document.getElementById("expandButton");
	var img = art_view.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0];
	if (bttn.textContent.indexOf("+") >= 0) {
		img.style.maxHeight = "";
		bttn.textContent = "(-) Inpand";
		art_view.scrollIntoView({behavior: "smooth", block: "start"});
	} else {
		img.style.maxHeight =  window.innerHeight - 20 + "px";
		bttn.textContent = "(+) Expand";
		art_view.scrollIntoView({behavior: "smooth", block: "start"});
	}
}

function init(shrink) {
	
	var art_view = document.getElementById("detail-art");
	if (art_view) {
		var img = art_view.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0];
		if (shrink) {
			img.style.maxHeight = window.innerHeight - 20 + "px";
		}
		
		var resize_btn = document.createElement("LI");
		var btn_content = document.createElement("A");
		btn_content.setAttribute("id", "expandButton");
		if (shrink) {
			btn_content.textContent = "(+) Expand";
		} else {
			btn_content.textContent = "(-) Inpand";	
		}
		resize_btn.appendChild(btn_content);
		resize_btn.addEventListener("click", expandImage);
		
		var detail_actions = document.getElementById("detail-actions");
		detail_actions.appendChild(resize_btn);
		
	}
}

function getOptions() {
	browser.storage.local.get({
			shrinkLarge: true,
		}, function(items) {
			init(items.shrinkLarge);
	});
}
getOptions();
