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

			$('<li />').text(json['title'])
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

			$('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);
		}
	}).equal_spacing({
		item:      '.bk-box'
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
			var box, cur_box = context['cur_box'];

			if (json['type'] != "text/x-moz-place")
				return;

			box = $('<li />').addClass('bk-item')
					 .appendTo(cur_box);

			$('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);

			context['cur_box'] = add_box(target, cur_box,
						     box, context['prev']);
			context['prev'] = box;
		}
	}).equal_spacing({
		item:      '.bk-box'
	});

	$('.bk-box').css({"height": 500});

})}} (jQuery));

(function($) {
$.fn.equal_spacing = function(options) {
return this.each(function() {
	var t = $(this), item = $(options.item);

	$(options.container).addClass('es-clearfix')

	$(window).resize(function() {
				equal_spacing(t, item);
			 });

	equal_spacing(t, item);

	function equal_spacing(box, contents) {
		var box_width, item_width, items_num, margin;

		box_width = box.innerWidth();
		item_width = contents.outerWidth();

		items_num = Math.floor(box_width / item_width);
		margin = Math.floor((box_width % item_width) / items_num / 2);

		contents.css({"margin-right": margin, "margin-left": margin});
	}
})}} (jQuery));
