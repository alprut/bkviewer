(function($) {
	var formatter = "chrome://bkviewer/content/bkviewer_index.js";

	$('<script />').attr({"type": "text/javascript",
			      "src":  formatter })
		       .appendTo('head');
} (jQuery));
