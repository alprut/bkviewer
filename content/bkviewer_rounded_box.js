(function($) {
$.fn.bkviewer_rounded_box = function(options) {
return this.each(function() {
	var t = $(this);
	var hiddens = new Object();

	function remove_item(hiddens, i) {
		var items = hiddens.items, head, tail;

		head = items.slice(0, i);
		tail = items.slice(i+1, items.length);
		hiddens.items = head.concat(tail);
	}

	function toggle_and_save(box, title, hiddens) {
		var prefs = nsPreferences;
		var key = "extensions.bkviewer.hiddens";

		box.slideToggle(function() {
			var box = $(this);
			var i = hiddens.items.indexOf(title);

			if (box.css('display') == 'none') {
				if (i == -1)
					hiddens.items.push(title);
			} else {
				if (i != -1)
					remove_item(hiddens, i);
			}

			prefs.setUnicharPref(key,
					     JSON.stringify(hiddens.items));
		});
	}

	t.show_bookmarks({
		add_category_view: function(json, target, context) {
			var result, box = target;

			box = $('<ul />').addClass('bk-category')
					 .appendTo(box);

			$('<li />').text(json['title'])
				   .addClass('bk-category')
				   .appendTo(box)
				   .click(function() {
					toggle_and_save($(this).next(),
							json['title'],
							hiddens);
				   });

			box = $('<ul />').addClass('bk-item')
					 .appendTo(box);

			context.cur_box = box;
		},

		add_item_view: function(json, target, context) {
			var box = context.cur_box, atag;
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
		},
	});

	$('ul.bk-item').addClass('bv-clearfix')
		       .each(function() {
		var t = $(this);
		var item = t.find('li.bk-item');

		$(window).resize(function() {
					equal_spacing(t, item);
				 });

		equal_spacing(t, item);
	});

	hide_categories(t, hiddens);

	function hide_categories(target, hiddens) {
		/* Users may change titles, so this synchronize
		 * the preferences with the actual titles.
		 */
		var prefs = nsPreferences;
		var key = "extensions.bkviewer.hiddens";
		var new_hiddens = [];
		var i, box, title;

		hiddens.items = JSON.parse(prefs.copyUnicharPref(key, "[]"));
		target.find('ul.bk-category').each(function() {
			box = $(this);
			title = box.children('li').text();
			i = hiddens.items.indexOf(title);
			if (i != -1) {
				box.children('ul').hide();
				new_hiddens.push(title);
			}
		});

		hiddens.items = new_hiddens;
		prefs.setUnicharPref(key, JSON.stringify(hiddens.items));
	}

	function equal_spacing(box, contents) {
		var box_width, item_width, items_num, margin;

		contents.width("");
		contents.css("margin-right", 0);

		item_width = 0;
		contents.each(function() {
			if (item_width < $(this).width()) {
				item_width = $(this).width();
			}
		});

		contents.width(item_width + 1);

		box_width = box.innerWidth() - 1;
		item_width = contents.outerWidth() + 1;

		items_num = Math.floor(box_width / item_width);
		if (items_num <= contents.size()) {
			margin = (box_width % item_width) / items_num;
			margin = Math.floor(margin);
			contents.css("margin-right", margin);
		}
	}

})}} (jQuery));
