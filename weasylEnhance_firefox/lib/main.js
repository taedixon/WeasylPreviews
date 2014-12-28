
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var prefs = require("sdk/simple-prefs").prefs;
 
pageMod.PageMod({
  include: "https://www.weasyl.com*",
  contentScriptWhen: "ready",
  contentStyleFile: self.data.url("preview_styles.css"),
  contentScriptFile: [self.data.url("jquery-1.11.1.min.js"),
		self.data.url("weasyl_previewer.js")],
	contentScriptOptions: {"prefs": prefs}
});

pageMod.PageMod({
  include: "https://www.weasyl.com/submission/*",
  contentScriptWhen: "ready",
  contentScriptFile: [self.data.url("jquery-1.11.1.min.js"),
		self.data.url("weasyl_small_submission.js")],
	contentScriptOptions: {"prefs": prefs}
});