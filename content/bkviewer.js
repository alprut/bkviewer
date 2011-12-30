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
$.fn.bkviewer_rounded_box = function(options) {
return this.each(function() {
	var t = $(this);

	t.show_bookmarks({
		add_category_view: function(json, target, context) {
			var result, box = target;

			if (json['type'] != "text/x-moz-place-container")
				return null;

			box = $('<ul />').addClass('bk-category')
					 .appendTo(box);

			$('<li />').text(json['title'])
				   .addClass('bk-category')
				   .appendTo(box);

			box = $('<ul />').addClass('bk-item')
					 .appendTo(box);
			return box;
		},

		add_item_view: function(json, category_view, target, context) {
			var box = category_view, atag;

			if (json['type'] != "text/x-moz-place")
				return;
			if (json['uri'].substr(0, 6) == "place:")
				return null;

			box = $('<li />').addClass('bk-item')
					 .appendTo(box);

			atag = $('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);

			$('<img />').addClass('favicon')
				    .attr({'src': json['favicon']})
				    .prependTo(atag);

		}
	});

	$('ul.bk-category').addClass('es-clearfix');
	$('ul.bk-item').equal_spacing({
		item: 'li.bk-item'
	});
})}} (jQuery));

(function($) {
$.fn.bkviewer_index = function(options) {
return this.each(function() {
	var t = $(this);

	function add_box(target, cur_box, item, prev, prev2) {
		var box;

		if (cur_box.height() > 500) {
			box = $('<ul />').addClass('bk-box')
					 .appendTo(target);

			if (prev && prev.hasClass('bk-category')) {
				box.append(prev);
			}

			box.append(item);
		} else {
			box = cur_box;
		}

		return box;
	}

	t.show_bookmarks({
		init: function(target, context) {
			context['cur_box'] = $('<ul />').addClass('bk-box')
							.appendTo(target);
		},
		add_category_view: function(json, target, context) {
			var box, cur_box = context['cur_box'];

			if (json['type'] != "text/x-moz-place-container")
				return null;


			box = $('<li />').text(json['title'])
					 .addClass('bk-category')
					 .appendTo(cur_box);

			context['cur_box'] = add_box(target, cur_box, box,
						     context['prev']);
			context['prev'] = box;
		},

		add_item_view: function(json, category_view, target, context) {
			var box, cur_box = context['cur_box'], atag;

			if (json['type'] != "text/x-moz-place")
				return;
			if (json['uri'].substr(0, 6) == "place:")
				return null;

			box = $('<li />').addClass('bk-item')
					 .appendTo(cur_box);

			atag = $('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);

			$('<img />').addClass('favicon')
				    .attr({'src': json['favicon']})
				    .prependTo(atag);

			context['cur_box'] = add_box(target, cur_box,
						     box, context['prev']);
			context['prev'] = box;
		}
	}).equal_spacing({
		item:      '.bk-box'

	}).addClass('es-clearfix');

	$('.bk-box').css({"height": 500});

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

		box_width = box.innerWidth();
		item_width = contents.outerWidth();

		items_num = Math.floor(box_width / item_width);
		if (items_num > contents.size())
			items_num = contents.size();

		margin = Math.floor((box_width % item_width) / items_num / 2);
		first_margin = items_num * (2 * margin + item_width);
		first_margin = box_width - first_margin;
		first_margin = Math.floor(margin + first_margin / 2);

		contents.css({"margin-right": margin, "margin-left": margin})
		contents.first()
			.css({"margin-right": margin,
			      "margin-left": first_margin});
	}
})}} (jQuery));
