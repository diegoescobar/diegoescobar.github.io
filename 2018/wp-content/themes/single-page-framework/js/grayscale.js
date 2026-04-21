//jQuery to collapse the navbar on scroll
jQuery(document).ready(function ($) {
	jQuery(window).scroll(function($) {
	    if (jQuery(".navbar").offset().top > 50) {
	        jQuery(".navbar-fixed-top").addClass("top-nav-collapse");
	    } else {
	        jQuery(".navbar-fixed-top").removeClass("top-nav-collapse");
	    }
	});
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
jQuery(function($) {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


jQuery(document).ready(function($){
	$('.blogslider').bxSlider({adaptiveHeight: true});
});
