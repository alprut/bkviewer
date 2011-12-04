Components.utils.import("resource://gre/modules/PlacesUtils.jsm");

(function($) {
$.fn.show_bookmarks = function(options) {
return this.each(function() {
	var t = $(this);
	var bookmarks = bookmark_json();
	add_view(t, bookmarks['children'], options);

	function init(target, context) {
	}

	function add_category_view(json, target, context) {
	}

	function add_item_view(json, category_view, targelt, context) {
	}

/* Generic functions */

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

	function add_view(target, category_set, options) {
		var item_set, category;
		var i,j;
		var category_view;
		var defaults = {
			children_key:      'children',
			init:		   init,
			add_category_view: add_category_view,
			add_item_view:     add_item_view
		};
		var context = {};

		var opts = $.extend({}, defaults, options);

		opts.init(target, context);

		for (i = 0; i < category_set.length; i++) {
			category = category_set[i];
			category_view = opts.add_category_view(category,
							       target,
							       context);

			item_set = category[opts.children_key];
			if (! item_set)
				continue;

			for (j = 0; j < item_set.length; j++) {
				opts.add_item_view(item_set[j], category_view,
						   target, context);
			}
		}
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

			$('<li />').html(json['title'])
				   .addClass('bk-category')
				   .appendTo(box);

			box = $('<ul />').addClass('bk-item')
					 .appendTo(box);
			return box;
		},

		add_item_view: function(json, category_view, target, context) {
			var box = category_view;

			if (json['type'] != "text/x-moz-place")
				return;

			box = $('<li />').addClass('bk-item')
					 .appendTo(box);

			$('<a />').html(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);
		}
	});
})}} (jQuery));

(function($) {
$.fn.equal_spacing = function(options) {
return this.each(function() {

	$(options.container).addClass('sg-clearfix')

	$(window).resize(function() {
				equal_spacing(options.container, options.item);
			 });

	equal_spacing(options.container, options.item);

	function equal_spacing(box, item) {
		var box_width, item_width, items_num, margin;

		box_width = $(box).width() - 1;
		item_width = $(item).width();

		items_num = Math.floor(box_width / item_width);
		margin = Math.floor((box_width % item_width) / items_num / 2);

		$(item).css({"margin-right": margin, "margin-left": margin});
	}
})}} (jQuery));
