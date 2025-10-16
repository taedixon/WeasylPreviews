
const add_submissions_link = () => {
	let more_item = document.querySelector(".home-latest>.more");
	if (more_item) {
		var link = document.createElement("a");
		link.className = "more";
		link.href = "/search?find=submit";
		var italic = document.createElement("i");
		italic.textContent = "Browse";
		var span = document.createElement("span");
		span.textContent = "Submissions";
		link.appendChild(italic);
		link.append(" ");
		link.appendChild(span);
		more_item.appendChild(link);
	}
}

browser.storage.local.get({
		showSubmissionsLink: true,
	}, function(items) {
		if (items.showSubmissionsLink) {
			add_submissions_link();
		}
});