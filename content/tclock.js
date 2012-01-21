/* ===========================================================================
 * Tclock: Tiny digital clock
 *
 * Author: Yasuyuki Kozakai
 * License: MIT license
 * ===========================================================================
 */
(function($) {
$.fn.tclock = function(options) {
return this.each(function(){
	var target = $(this);
	var targetTime = target.find('.tclock-time');
	var targetDate = target.find('.tclock-date');

	function tclock_update() {
		function twoDigits(num) {
			return String("00" + num).slice(-2);
		}

		var now     = new Date();
		var year    = now.getFullYear();
		var month   = now.getMonth();
		var date    = now.getDate();
		var day     = now.getDay();
		var hours   = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();

		var month_str = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
				  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var week_str = [ "Sun", "Mon", "Tue", "Wed",
				 "Thu", "Fri", "Sat" ];

		var time_str = twoDigits(hours) + ":" +
			       twoDigits(minutes) + ":" +
			       twoDigits(seconds);

		var date_str = week_str[day] + " " +
			       month_str[month] + " " +
			       twoDigits(date) + ", " +
			       year;

		targetTime.html(time_str);
		targetDate.html(date_str);
	}

	tclock_update();
	setInterval(tclock_update, 1000);

})}}(jQuery));
