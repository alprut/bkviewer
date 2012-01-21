(function($) {
$.fn.bkviewer = function(options) {
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
