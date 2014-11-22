/***************************
	SHRINK_SUBMISSIONS
***************************/
function expandImage() {
	var art_view = document.getElementById("detail-art");
	var bttn = document.getElementById("expandButton");
	var img = art_view.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0];
	if (bttn.innerHTML.contains("+")) {
		img.style.maxHeight = "";
		bttn.innerHTML = "(-) Inpand";
	} else {
		img.style.maxHeight =  window.innerHeight - 20 + "px";
		bttn.innerHTML = "(+) Expand";
		
		$('html, body').animate({
			scrollTop: $("#detail-art").offset().top
		}, 500);
	}
}

var art_view = document.getElementById("detail-art");
if (art_view) {
	var img = art_view.getElementsByTagName("A")[0].getElementsByTagName("IMG")[0];
	img.style.maxHeight = window.innerHeight - 20 + "px";
	
	var resize_btn = document.createElement("LI");
	resize_btn.innerHTML = "<a id='expandButton'>(+) Expand</a>";
	resize_btn.addEventListener("click", expandImage);
	
	var detail_actions = document.getElementById("detail-actions");
	detail_actions.appendChild(resize_btn);
	
}
