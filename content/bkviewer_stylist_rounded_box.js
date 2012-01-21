(function($) {
	var json;
	var prefs = nsPreferences;
	var key_base = "extensions.bkviewer.";
	var frame_color = prefs.copyUnicharPref(key_base + "frame_color",
						"#0ac");
	var bg_color =    prefs.copyUnicharPref(key_base + "bg_color",
						"#fff");
	var text_color =  prefs.copyUnicharPref(key_base + "text_color",
						"#00f");
	json = {
		"body": {
			"background-color": bg_color,
			"color": text_color,
		},
		".es-clearfix:after": {
			"content":    "\".\"",
			"clear":      "both",
			"display":    "block",
			"height":     "0",
			"visibility": "hidden",
		},
		
		".es-clearfix": {
			"display": "inline-block",
		},
		
		"* html .es-clearfix": {
			"height": "1%",
		},
		
		".es-clearfix": {
			"display": "block",
		},
		
		"ul.bk-category": {
			"padding-top":   "0pt",
			"padding-left":  "0pt",
			"padding-right": "0pt",
			"margin-left":   "0pt",
			"margin-right":  "0pt",
			"border-color":  frame_color,
			"border-width":  "1pt",
			"border-style":  "solid",
			"border-radius": "10pt",
		},
		
		"li.bk-category": {
			"color":	    bg_color,
			"background-color": frame_color,
			"text-align":       "center",
			"font-weight":      "bold",
			"list-style-type":  "none",
			"clear":            "left",
			"margin-top":       "0pt",
			"margin-bottom":    "5pt",
			"border-radius":    "8pt 8pt 0pt 0pt",
		},
		
		"ul.bk-item": {
			"padding-left":  "0pt",
			"padding-right": "0pt",
			"margin-left":   "0pt",
			"margin-right":  "0pt",
		},
		
		"li.bk-item": {
			"width":           "150pt",
			"list-style-type": "none",
			"float":           "left",
			"margin-top":      "2pt",
			"margin-bottom":   "2pt",
			"text-align":      "center",
		},
		
		"a.bk-item": {
			"text-decoration": "none",
			"color": text_color,
		},
		
		"img.favicon": {
			"width":   "16px",
			"height":  "16px",
			"margin":  "5px 5px 0px 0px",
			"padding": "0px 0px 0px 0px",
		},
	};

	$('style').stylist(json);
		
} (jQuery));
