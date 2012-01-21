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
			"background-color":	bg_color,
			"color":		text_color,
		},
		".es-clearfix:after": {
			"content":	"\".\"",
			"clear":	"both",
			"display":	"block",
			"height":	"0",
			"visibility":	"hidden",
		},
		
		".es-clearfix": {
			"display":	"inline-block",
		},
		
		"* html .es-clearfix": {
			"height":	"1%",
		},
		
		".es-clearfix": {
			"display":	"block",
		},
		
		"ul.bk-box": {
			"width":         "210px",
			"padding-top":   "0pt",
			"padding-left":  "0pt",
			"padding-right": "0pt",
			"margin-left":   "0pt",
			"margin-right":  "0pt",
			"border-color":  frame_color,
			"border-width":  "1pt",
			"border-style":  "solid",
			"float":         "left",
		},
		
		"li.bk-category": {
			"color":	    bg_color,
			"background-color": frame_color,
			"text-align":       "center",
			"font-weight":      "bold",
			"list-style-type":  "none",
			"margin-top":       "0pt",
			"margin-bottom":    "0pt",
		},
		
		"li.bk-item": {
			"list-style-type": "none",
			"margin-top":      "2pt",
			"margin-bottom":   "2pt",
			"padding-left":    "5pt",
		},
		
		"a.bk-item": {
			"text-decoration": "none",
			"color":	   text_color,
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

