(function($) {
$.fn.bkviewer_rounded_box = function(options) {
return this.each(function() {
	var t = $(this);

	t.show_bookmarks({
		add_category_view: function(json, target, context) {
			var result, box = target;

			box = $('<ul />').addClass('bk-category')
					 .appendTo(box);

			$('<li />').text(json['title'])
				   .addClass('bk-category')
				   .appendTo(box);

			box = $('<ul />').addClass('bk-item')
					 .appendTo(box);

			context['cur_box'] = box;
			context['max_width'] = 0;
		},

		add_item_view: function(json, target, context) {
			var box = context['cur_box'], atag;
			var default_height;

			box = $('<li />').addClass('bk-item')
					 .appendTo(box);

			atag = $('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);

			$('<img />').addClass('favicon')
				    .attr({'src': json['favicon']})
				    .prependTo(atag);

			if (box.width() > context['max_width']) {
				context['max_width'] = box.width();
			}
		},

		after_adding_category: function(target, context) {
			context['cur_box'].find('li.bk-item')
					  .width(context['max_width'] + 1);
		}
	});

	$('ul.bk-category').addClass('es-clearfix');

	$('ul.bk-item').each(function() {
		var t = $(this);
		var item = t.find('li.bk-item');
		var should_go_center = false;

		$(window).resize(function() {
					equal_spacing(t, item);
				 });

		equal_spacing(t, item);

		function equal_spacing(box, contents) {
			var box_width, item_width, items_num, margin, first_margin;
			var is_little = false;

			box_width = box.innerWidth() - 1;
			item_width = contents.outerWidth() + 1;

			items_num = Math.floor(box_width / item_width);
			if (items_num > contents.size()) {
				items_num = contents.size();
				is_little = true;
			}

			margin = (box_width % item_width) / items_num;
			if (should_go_center) {
				margin = Math.floor(margin / 2);
				contents.css({"margin-right": margin,
					      "margin-left":  margin})
			} else {
				margin = Math.floor(margin);
				contents.css({"margin-right": margin,
					      "margin-left":  0});
			}

			if (is_little && should_go_center) {
				/* Don't do equal spacing it there is not
				   enough items */
				first_margin = items_num * (2 * margin + item_width);
				first_margin = box_width - first_margin;
				first_margin = Math.floor(margin + first_margin / 2);
				contents.first()
					.css({"margin-right": margin,
					      "margin-left": first_margin});
			}
		}

	});

})}} (jQuery));
