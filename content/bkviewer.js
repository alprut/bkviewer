Components.utils.import("resource://gre/modules/PlacesUtils.jsm");
Components.utils.import("resource://gre/modules/PlacesBackups.jsm");
Components.utils.import("resource://gre/modules/Task.jsm");

(function($) {
$.fn.show_bookmarks = function(options) {
return this.each(function() {
	var t = $(this);

	Task.spawn(function*() {
		let [bookmarks, count] = yield PlacesBackups.getBookmarksTree();

		add_view(t, bookmarks['children'][0], options);
	});

	function init(target, context) {
	}

	function add_category_view(json, target, context) {
	}

	function add_item_view(json, target, context) {
	}

	function fini(target, context) {
	}

/* Generic functions */

	function replace_favicon(uri, img_tag) {
		PlacesUtils.favicons.getFaviconDataForPage(
			PlacesUtils._uri(uri),
			function(aURI, aDatalen, aData, aMimeType) {
				var str;

				if (aURI == null) {
					return;
				}

				str = "data:" + aMimeType + ";base64,"
				+ btoa(String.fromCharCode.apply(null, aData));

				img_tag.attr("src", str);
			}
		);
	}

	function make_category_view(target, category, context, opts,
				    category_is_first) {
		var children;
		var i;
		var category_view;
		var item;
		var is_empty = true;
		var category_set = new Array();
		var item_set = new Array();
		var favicon_tag;

		if (category['type'] != "text/x-moz-place-container")
			return;

		children = category[opts.children_key];
		if (! children)
			return;

		/* IMPROVE_ME: support smart bookmark */
		for (i = 0; i < children.length; i++) {
			item = children[i];

			if (item['type'] == "text/x-moz-place-container") {
				category_set.push(item);
			} else if (item['type'] == "text/x-moz-place" &&
				   item['uri'].substr(0, 6) != "place:") {
				item_set.push(item);
			}
		}

		if (category_is_first) {
			for (i = 0; i < category_set.length; i++) {
				make_category_view(target, category_set[i],
						   context, opts, false);
			}
		}

		if (item_set.length != 0)
			opts.add_category_view(category, target, context);

		for (i = 0; i < item_set.length; i++) {
			item = item_set[i];
			item['favicon'] = "chrome://mozapps/skin/places/defaultFavicon.png";

			favicon_tag = opts.add_item_view(item, target, context);
			replace_favicon(item['uri'], favicon_tag);
		}

		if (! category_is_first) {
			for (i = 0; i < category_set.length; i++) {
				make_category_view(target, category_set[i],
						   context, opts, false);
			}
		}
	}

	function add_view(target, json, options) {
		var i;
		var defaults = {
			children_key:      'children',
			init:		   init,
			add_category_view: add_category_view,
			add_item_view:     add_item_view
		};
		var context = new Object;
		var opts = $.extend({}, defaults, options);

		opts.init(target, context);

		make_category_view(target, json, context, opts, true);

		opts.fini(target, context);
	}
})}} (jQuery));

(function($) {
$.fn.stylist = function(json) {
return this.each(function() {
	var style = "";

	for (var i in json) {
		style += i + " {\n";
		for (var j in json[i]) {
			style += "\t" + j + ":" + json[i][j] + ";\n";
		}
		style += "}\n";
	}

        $(this).text(style);

})}} (jQuery));
