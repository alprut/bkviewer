const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function AboutBookmarkViewer() { }
AboutBookmarkViewer.prototype = {
	classDescription: "about:bkviewer",
	contractID: "@mozilla.org/network/protocol/about;1?what=bkviewer",
	classID: Components.ID("{3faca288-53e5-4aa0-b656-b709ada875db}"),
	QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

	getURIFlags: function(aURI) {
		return Ci.nsIAboutModule.ALLOW_SCRIPT;
	},

	newChannel: function(aURI) {
		let ios = Cc["@mozilla.org/network/io-service;1"]
						.getService(Ci.nsIIOService);
		let bkviwer_uri = "chrome://bkviewer/content/bkviewer.html"
		let channel = ios.newChannel(bkviwer_uri, null, null);
		channel.originalURI = aURI;
		return channel;
	}
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutBookmarkViewer]);
