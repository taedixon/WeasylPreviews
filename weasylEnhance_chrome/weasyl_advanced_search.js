/***************************
	SEARCH_BUILDER
	+ CHROME
***************************/

function init(prefs) {
	if (!prefs.showQueryBuilder)
		return;
	//search field is an input with name "q" in these forms
	var headSearch = document.getElementById("header-search"); //FORM
	var bkpSearch = document.getElementById("search-backup-search"); //FORM
	
	//this one is fucky 
	var advSearch = document.getElementById("search-q"); //INPUT
	
	if (headSearch != null)
		initSearch(headSearch, "headerSearchBtn");
	if (bkpSearch != null) 
		initSearch(bkpSearch, "backupSearchButton");
	if (advSearch != null) {
		initSearch2(advSearch, "fullSearchButton");
	}
}

function updateSearchBar(input, form) {
	var tags = form.tags.value.split(/\s+/);
	var optional = form.optional.value.split(/\s+/);
	var exclude = form.exclude.value.split(/\s+/);
	var user = form.user.value.split(/\s+/);
	var xuser = form.excludeuser.value.split(/\s+/);
	
	var searchstr = "";
	searchstr += strapon(tags, "");
	searchstr += strapon(optional, "|");
	searchstr += strapon(exclude, "-");
	searchstr += strapon(user, "user:");
	searchstr += strapon(xuser, "-user:");
	
	input.value = searchstr;
}

function strapon(arr, prepend) {
	var rv = "";
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].length > 0)
			rv += " " + prepend + arr[i];
	}
	return rv;
}

function addField(form, label, field_name) {

	var fieldLabel, field;
	fieldLabel = document.createElement("label");
	fieldLabel.setAttribute("for", field_name);
	fieldLabel.appendChild(document.createTextNode(label));
	form.appendChild(fieldLabel);
	
	field = document.createElement("INPUT");
	field.setAttribute("class", "input");
	field.setAttribute("type", "text");
	field.setAttribute("name", field_name);
	form.appendChild(field);
}

function buildControls(head) {
	var controls = document.createElement("FORM");
	controls.addEventListener("submit", function() {head.submit();});
	controls.setAttribute("action", "javascript:void(0);");
	controls.addEventListener("keyup", function() {updateSearchBar(head.q, controls)});
	controls.setAttribute("class", "searchBuilder form");
	var closeControls = document.createElement("SPAN");
	closeControls.addEventListener("click", function(){controls.style.display = "none";});
	closeControls.appendChild(document.createTextNode("[x] close"));
	controls.appendChild(closeControls);
	
	
	addField(controls, "Must-have tags:", "tags");
	addField(controls, "Has at least one of:", "optional");
	addField(controls, "Without tags:", "exclude");
	addField(controls, "By User:", "user");
	addField(controls, "Exclude User:", "excludeuser");
	var submit = document.createElement("INPUT");
	submit.setAttribute("type", "submit");
	submit.setAttribute("value", "Submit");
	submit.style.visibility = "hidden";
	controls.appendChild(submit);
	
	return controls;
}

function initSearch(head, id) {
	var controls = buildControls(head);
	var ul, li;
	if (id == "headerSearchBtn") {
		ul = document.createElement("UL");
		li = document.createElement("LI");
	} else {
		ul = document.createElement("P");
		li = document.createElement("I");
	}
	var btn = document.createElement("A");
	btn.addEventListener("click", function() {controls.style.display="initial";});
	btn.setAttribute("href", "javascript:void(0);");
	btn.appendChild(document.createTextNode("Search Builder"));
	li.appendChild(btn);
	ul.appendChild(controls);
	ul.appendChild(li);
	ul.setAttribute("id", id);	
	
	head.parentNode.insertBefore(ul, head.nextSibling);
}

//redundant pls fix me
function initSearch2(head, id) {
	var controls = buildControls(head.parentNode);
	var ul = document.createElement("P");
	var li = document.createElement("I");
	var btn = document.createElement("A");
	btn.addEventListener("click", function() {controls.style.display="initial";});
	btn.setAttribute("href", "javascript:void(0);");
	btn.appendChild(document.createTextNode("Search builder"));
	li.appendChild(btn);
	ul.appendChild(controls);
	ul.appendChild(li);
	ul.setAttribute("id", id);	
	ul.setAttribute("class", "color-lighter tags-help");
	
	head.parentNode.insertBefore(ul, head.nextSibling.nextSibling.nextSibling); //this is dumb
}

function getOptions() {
	chrome.storage.sync.get({
		showQueryBuilder: true,
	}, init);
}

getOptions();