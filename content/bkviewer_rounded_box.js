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
	$('ul.bk-item').equal_spacing({
		item: 'li.bk-item'
	});
})}} (jQuery));
