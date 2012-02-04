if (typeof firefox_addon_bkviewer === "undefined") {
	var firefox_addon_bkviewer = {};
};

firefox_addon_bkviewer.load_page = function() {
	gBrowser.selectedTab = gBrowser.addTab("about:bkviewer");
}
