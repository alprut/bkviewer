Components.utils.import("resource://gre/modules/PlacesUtils.jsm");

(function($) {
$.fn.show_bookmarks = function(options) {
return this.each(function() {
	var t = $(this);
	var bookmarks = bookmark_json();

	add_view(t, bookmarks, options);

	function init(target, context) {
	}

	function add_category_view(json, target, context) {
	}

	function add_item_view(json, category_view, targelt, context) {
	}

/* Generic functions */

	function favicon_uri_for(uri) {
		var result = "";

		try {
			var util = PlacesUtils.favicons;
			var fav_data = util.getFaviconForPage(
							PlacesUtils._uri(uri));
			var mime = {};
			var len = {};
			var icon = util.getFaviconData(fav_data, mime, len);
			result = "data:" + mime.value + ";base64," +
				 btoa(String.fromCharCode.apply(null, icon));
		} catch(e) {
			result =
			      "chrome://mozapps/skin/places/defaultFavicon.png";
		}

		return result;
	}

	function bookmark_json() {
		var id = PlacesUtils.bookmarksMenuFolderId,
		parentNode = PlacesUtils.getFolderContents(id).root,
		result;

		var writer = {
			value : '',
			write : function(aData, aLen) {
				this.value += aData;
			}
		};

		PlacesUtils.serializeNodeAsJSONToOutputStream(parentNode,
							      writer, true,
							      true, []);

		return eval("(" + writer.value + ")");
	}

	function make_category_view(target, category, context, opts) {
		var item_set;
		var i;
		var category_view;
		var item;

		category_view = opts.add_category_view(category,
						       target,
						       context);

		item_set = category[opts.children_key];
		if (! item_set)
			return;

		for (i = 0; i < item_set.length; i++) {
			item = item_set[i];
			item['favicon'] = favicon_uri_for(item['uri']);

			opts.add_item_view(item, category_view,
					   target, context);
		}
	}

	function add_view(target, json, options) {
		var category;
		var category_set;
		var i;
		var defaults = {
			children_key:      'children',
			init:		   init,
			add_category_view: add_category_view,
			add_item_view:     add_item_view
		};
		var context = {};

		var opts = $.extend({}, defaults, options);

		opts.init(target, context);

		category_set = json['children'];
		for (i = 0; i < category_set.length; i++) {
			category = category_set[i];
			make_category_view(target, category, context, opts);
		}

		make_category_view(target, json, context, opts);
	}
})}} (jQuery));

(function($) {
$.fn.equal_spacing = function(options) {
return this.each(function() {
	var t = $(this), item = $(options.item);

	$(window).resize(function() {
				equal_spacing(t, item);
			 });

	equal_spacing(t, item);

	function equal_spacing(box, contents) {
		var box_width, item_width, items_num, margin, first_margin;
		var is_little = false;

		box_width = box.innerWidth();
		item_width = contents.outerWidth();

		items_num = Math.floor(box_width / item_width);
		if (items_num > contents.size()) {
			items_num = contents.size();
			is_little = ture;
		}

		margin = Math.floor((box_width % item_width) / items_num / 2);
		contents.css({"margin-right": margin, "margin-left": margin})

		if (is_little) {
			/* Don't do equal spacing it there is not enough
			   items */
			first_margin = items_num * (2 * margin + item_width);
			first_margin = box_width - first_margin;
			first_margin = Math.floor(margin + first_margin / 2);
			contents.first()
				.css({"margin-right": margin,
				      "margin-left": first_margin});
		}
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

        $(this).html("<!--" + style + "-->");

})}} (jQuery));

(function($) {
	var prefs = nsPreferences;
	var key = "extensions.bkviewer.theme";
	var theme = prefs.copyUnicharPref(key, "rounded_box");
	var base_uri = "chrome://bkviewer/content/";
	var stylist = base_uri + "bkviewer_stylist_" + theme + ".js";
	var formatter = base_uri + "bkviewer_" + theme + ".js";

	$('<script />').attr({"type": "text/javascript",
			      "src":  stylist })
		       .appendTo('head');
	$('<script />').attr({"type": "text/javascript",
			      "src":  formatter })
		       .appendTo('head');
} (jQuery));

