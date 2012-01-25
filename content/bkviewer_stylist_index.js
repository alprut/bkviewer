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

	/* 2 is 2 * (border width), 15 is the width of scroll bar,
	   1 is because the border width is over 1px and it is
	   at most 1.333...px if the page is zoomed in.
	   The last 10px is space between columns. */
	var columns =  prefs.getIntPref(key_base + "columns", 6);
	var spaces = $(window).width() - $('body').innerWidth();
	var availWidth = screen.availWidth - spaces - 15;
	var column_width = Math.floor(availWidth / columns) - 2 - 1 - 10;

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
			"width":         String(column_width) + "px",
			"padding-top":   "0px",
			"padding-left":  "0px",
			"padding-right": "0px",
			"margin-left":   "0px",
			"margin-right":  "0px",
			"border-color":  frame_color,
			"border-width":  "1px",
			"border-style":  "solid",
			"float":         "left",
		},
		
		"li.bk-category": {
			"color":	    bg_color,
			"background-color": frame_color,
			"text-align":       "center",
			"font-weight":      "bold",
			"list-style-type":  "none",
			"margin-top":       "0px",
			"margin-bottom":    "0px",
		},
		
		"li.bk-item": {
			"list-style-type": "none",
			"margin-top":      "2px",
			"margin-bottom":   "2px",
			"padding-left":    "5px",
		},
		
		"a.bk-item, a.configuration": {
			"text-decoration": "none",
			"color":	   text_color,
		},
		
		"img.favicon": {
			"width":	  "16px",
			"height":	  "16px",
			"margin":	  "0px 5px 0px 0px",
			"padding":	  "0px 0px 0px 0px",
			"vertical-align": "text-bottom",
		},

		"p.configuration": {
			"text-align": "right",
		},
	};

	$('style').stylist(json);

} (jQuery));

