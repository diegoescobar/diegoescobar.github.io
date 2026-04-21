jQuery(document).ready(function ($) {
$(document).on("click", '.portfolio-item a', function () {
	var src = $(this).attr('href');
	$.ajax({
	  url: src,
	  cache: false
	})
	  .done(function( html ) {
	    $( "section#portfolio div.modal-body" ).html( html );
	    $('#portfolioModal').modal();
	  });
	
	return false;
});


$(document).on("click", "a.page-numbers", function () {	
	var src = $(this).attr('href');
	$.ajax({
	  url: src,
	  cache: false
	})
	  .done(function( html ) {
	    $( "section#portfolio" ).html( html );
	  });

	return false;
});

});