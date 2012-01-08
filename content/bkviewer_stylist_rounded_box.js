(function($) {
	var json = {
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
			"border-color":  "#0ac",
			"border-width":  "1pt",
			"border-style":  "solid",
			"border-radius": "10pt",
		},
		
		"li.bk-category": {
			"color":	    "white",
			"background-color": "#0ac",
			"text-align":       "center",
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
			"margin-top":      "5pt",
			"margin-bottom":   "5pt",
			"text-align":      "center",
		},
		
		"a.bk-item": {
			"text-decoration": "none",
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
