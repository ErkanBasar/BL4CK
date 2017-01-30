
$(document).ready( function() {
    $("#playlist").niceScroll({styler:"fb", scrollspeed: 150, mousescrollstep: 100, cursorcolor:"#FFF", cursorwidth: '8', cursorborderradius: '5px', spacebarenabled:false, cursorborder: '', zindex: '1000'});
  }
);


jQuery(function($){
  	$('#menu-btn').click(function(){
    		$('.responsive-menu').toggleClass('expand')
    		$('#menu-btn').toggleClass('is-active')
  	})
})
