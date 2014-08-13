+function ($) { "use strict";

  $(function(){
 	
	// slider
	$('.slider').each(function(){
		$(this).slider();
	});

	// slim-scroll
	$('.no-touch .slim-scroll').each(function(){
		var $self = $(this), $data = $self.data(), $slimResize;
		$self.slimScroll($data);
		$(window).resize(function(e) {
			clearTimeout($slimResize);
			$slimResize = setTimeout(function(){$self.slimScroll($data);}, 500);
		});
		$(document).on('updateNav', function(){
			$self.slimScroll($data);
		});
	});	

	//chosen
	$(".chosen-select").length && $(".chosen-select").chosen();

  });
  
  $(document).on('click', '.close-nav', function() {
	$('#nav').removeClass('nav-off-screen');
	$('html').removeClass('open');
	console.log($(this).closest('li').attr('class'));
  });
  
}(window.jQuery);