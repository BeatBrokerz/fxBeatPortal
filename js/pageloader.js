jQuery("html").addClass('html-onload');
jQuery(document.body).on("touchmove", function(e) {
    e.preventDefault();
});

var scrollPosition = [
self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
];
var html = jQuery('html');
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');
window.scrollTo(scrollPosition[0], scrollPosition[1]);

window.pageloaderComplete = function() {

	/* fade out the loading icon */
	jQuery(".pageloader-icon").addClass('pageloader-icon-hide');

	/* after 250ms delay, restore browser scroll + fade out loader background + slide down page */
	setTimeout(function(){

		/* enable browser scroll on touch devices */
		jQuery(document.body).unbind('touchmove');

		/* enable browser scroll on desktop */
		var html = jQuery('html');
		var scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1]);

		/* fade out loader */
		jQuery("#pageloader").addClass('pageloader-fade');

		/* slide down html */
		jQuery("html").removeClass('html-onload');

	},250);	
	
	/* after 1000ms delay, hide (not fade out) loader*/
	setTimeout(function(){

	/* hide loader after fading out*/
		jQuery("#pageloader").addClass('pageloader-hide');

	},1000);
	
}


