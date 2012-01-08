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
