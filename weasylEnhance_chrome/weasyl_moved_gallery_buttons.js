/***************************
	MOVED_GALLERY_BUTTONS
	+ CHROME
***************************/

function getOlder(div) {
	var childs = div.getElementsByTagName("A");
	switch(childs.length) {
		case 0:
		return false;
		break;
		default:
		return childs[childs.length-1].getAttribute("href");
	}
}

function getNewer(div) {
	var childs = div.getElementsByTagName("A");
	switch(childs.length) {
		case 0:
		return false;
		break;
		default:
		return childs[0].getAttribute("href");
	}
}

function init() {
		
	var art_div = document.getElementById("detail-art");
	var older = getOlder(document.getElementById("di-older"));
	var newer = getNewer(document.getElementById("di-newer"));
	
	var container = document.createElement("UL");
	container.setAttribute("class", "pad-left pad-right galleryNav");
	
	if (older) {
		var li = document.createElement("LI");
		var anch = document.createElement("A");
		anch.setAttribute("href", older);
		anch.appendChild(document.createTextNode("<< OLDER"));
		li.appendChild(anch);
		container.appendChild(li);
	}
	
	li = document.createElement("LI");
	anch = document.createElement("A");
	anch.appendChild(document.createTextNode("|"));
	li.appendChild(anch);
	container.appendChild(li);
	
	if (newer) {
		li = document.createElement("LI");
		anch = document.createElement("A");
		anch.setAttribute("href", newer);
		anch.appendChild(document.createTextNode("NEWER >>"));
		li.appendChild(anch);
		container.appendChild(li);
	}
	
	art_div.appendChild(container);
	art_div.parentNode.setAttribute("style", "padding-bottom:0px");
}

init();
