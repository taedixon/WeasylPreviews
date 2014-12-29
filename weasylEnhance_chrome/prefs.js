function saveOptions() {
	var form = document.getElementById("optionform");
	chrome.storage.sync.set({
		shrinkLarge: form.shrinkLarge.checked,
		prevDesc: form.prevDesc.checked,
		prevTags: form.prevTags.checked,
		prevUser: form.prevUser.checked,
		prevImage: form.prevImage.checked,
		prevDelay: form.prevDelay.value
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
		  status.textContent = '';
		}, 750);
	});
}
function applyPrefs(items) {
	var form = document.getElementById("optionform");
	form.shrinkLarge.checked = items.shrinkLarge;
	form.prevDesc.checked = items.prevDesc;
	form.prevTags.checked = items.prevTags;
	form.prevUser.checked = items.prevUser;
	form.prevImage.checked = items.prevImage;		
	form.prevDelay.value = items.prevDelay;
}
		
function getOptions() {
	chrome.storage.sync.get({
		shrinkLarge: true,
		prevDesc: true,
		prevTags: true,
		prevUser: true,
		prevImage: true,
		prevDelay: 1000
	}, applyPrefs);
}

	
document.getElementById('save').addEventListener('click',
		saveOptions);
document.addEventListener('DOMContentLoaded', getOptions);