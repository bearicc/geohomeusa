jQuery(window).ready(function() {

	/*CAROUSEL SHORTCODE*/
	jQuery(".looper-inner p, .looper-inner .item, .lts_pricing p, .lts_blocks p, .lts_blocks br, .lts_tab br, .lts_tabtitle").each(function(){
		if (!jQuery(this).text().trim().length) {
			jQuery(this).addClass("emptyp_clear");
		}
	});
	
	jQuery('.looper-inner .item, .lts_pricing .pricebox, .lts_block, .lts_tab_child').siblings('.emptyp_clear').remove();
	jQuery('.price_body .emptyp_clear').remove();
	
	//ADD ID to Carousel and MAP
	for (var i=0; i<20; i++){
		jQuery('.lts_looper:eq('+i+')').attr('id', 'lts_looper'+i+'');
		//jQuery('.lts_map_wrap:eq('+i+')').attr('id', 'lts_map'+i+'');
		jQuery('.lts_list:eq('+i+')').attr('id', 'lts_list'+i+'');
	}
	
	jQuery('.lts_looper.lts_default').each( function(){	
		jQuery(this).find('br').remove(); 
		var button_color = jQuery(this).attr('data-buttoncolor');
		 jQuery(this).find('nav').prepend('<a style="background:'+button_color+';" class="looper-control" data-looper="prev" href="#'+jQuery(this).attr('id')+'"><i class="fa fa-chevron-left"></i></a><a style="background:'+button_color+';" class="looper-control right" data-looper="next" href="#'+jQuery(this).attr('id')+'"><i class="fa fa-chevron-right"></i></a>');
	});
	jQuery('.lts_looper.lts_thick_border').each( function(){	
		jQuery(this).find('br').remove(); 
		var button_color = jQuery(this).attr('data-buttoncolor');
		 jQuery(this).find('nav').prepend('<a style="background:'+jQuery('body').css("background-color")+';" class="looper-control" data-looper="prev" href="#'+jQuery(this).attr('id')+'"><i  style="color:'+button_color+'!important;" class="fa fa-chevron-left"></i></a><a style="background:'+jQuery('body').css("background-color")+';" class="looper-control right" data-looper="next" href="#'+jQuery(this).attr('id')+'"><i style="color:'+button_color+'!important;" class="fa fa-chevron-right"></i></a>');
	});



/*PRICING SHORTCODE*/
	jQuery('.pricebox').has('.pricebox_featured').addClass('feat_price');
	
	jQuery(".lts_pricing").each(function(){
		var button_bg = jQuery(this).attr('data-button-bg');
		var button_color = jQuery(this).attr('data-button-txt');
		var pricebox_bg = jQuery(this).attr('data-price-bg');
		var pricebox_txt = jQuery(this).attr('data-price-txt');
		//Convert Background Color to RGBA
		var rgbaCol = 'rgba(' + parseInt(button_bg.slice(-6,-4),16)
			+ ',' + parseInt(button_bg.slice(-4,-2),16)
			+ ',' + parseInt(button_bg.slice(-2),16)
			+',0.3)';
		
		jQuery(this).find('.price_button, .pricebox_featured').attr('style', 'color:'+button_color+'!important;background:'+button_bg+';');
		jQuery(this).find('.price_button').css({"borderColor":button_bg});
		jQuery(this).find('.pricebox').css({"background":pricebox_bg});
		
		jQuery('.pricebox_inner').hover(function(){
			jQuery(this).css({"borderColor": rgbaCol});
			jQuery(this).find('.price_head h3').css({"backgroundColor": rgbaCol, "color":button_color});
		}, function(){
			jQuery(this).css({"borderColor": "rgba(0, 0, 0, 0.04)"});
			jQuery(this).find('.price_head h3').css({"backgroundColor": 'rgba(0, 0, 0, 0.02)', "color":pricebox_txt});
		});
	});

jQuery(".lts_pricing").each(function(){
	
	if(jQuery(this).find('.pricebox').length == 5){ jQuery(this).addClass('lts_pricebox5'); }
	if(jQuery(this).find('.pricebox').length == 4){ jQuery(this).addClass('lts_pricebox4'); }
	if(jQuery(this).find('.pricebox').length == 3){ jQuery(this).addClass('lts_pricebox3'); }
	if(jQuery(this).find('.pricebox').length == 2){ jQuery(this).addClass('lts_pricebox2'); }
	if(jQuery(this).find('.pricebox').length == 1){ jQuery(this).addClass('lts_pricebox1'); }
	//Equal Description Height
	var descheight = Math.max.apply(Math, jQuery(".price_desc").map(function () {return jQuery(this).outerHeight(); }));
	jQuery(this).find('.price_desc').outerHeight(descheight);
	//Equal Feature list box Height
	var featheight = Math.max.apply(Math, jQuery(".price_body ul").map(function () {return jQuery(this).outerHeight(); }));
	jQuery(this).find('.price_body ul').outerHeight(featheight);
});



//BLOCKS SHORTCODE
	jQuery('.lts_blocks .lts_block:empty').remove();
	jQuery(".lts_blocks").each(function(){
		jQuery(this).waitForImages(function() {
			jQuery(this).find('.lts_block').not('.block_full').matchHeight();
		});
		
		if(jQuery(this).find('.lts_block').length == 4){ jQuery(this).addClass('lts_fourblocks'); }
		if(jQuery(this).find('.lts_block').length == 3){ jQuery(this).addClass('lts_threeblocks'); }
		if(jQuery(this).find('.lts_block').length == 2){ jQuery(this).addClass('lts_twoblocks'); }
		if(jQuery(this).find('.lts_block').length == 1){ jQuery(this).addClass('lts_oneblock'); }
	});


//LIST Shortcode COLOR
jQuery(".lts_list").each(function(){
	var bulletcolor = jQuery(this).attr('data-list-color');
	var listid = jQuery(this).attr('id');
	jQuery('<style>#'+listid+' li:before{color:'+bulletcolor+'}</style>').appendTo('head');
});

	
//Columns Shortcode Clear
jQuery('.col2:eq(1), .col2:eq(3), .col2:eq(5), .col2:eq(7), .col2:eq(9), .col2:eq(11), .col2:eq(13), .col2:eq(15)').css({"marginRight":"0"}).after('<div style="clear:both" />');
jQuery('.col3:eq(2), .col3:eq(5), .col3:eq(8), .col3:eq(11), .col3:eq(14), .col3:eq(17), .col3:eq(20), .col3:eq(23)').css({"marginRight":"0"}).after('<div style="clear:both" />');
jQuery('.col4:eq(3), .col4:eq(7), .col4:eq(11), .col4:eq(15), .col3:eq(19), .col4:eq(23), .col4:eq(27), .col4:eq(31)').css({"marginRight":"0"}).after('<div style="clear:both" />');

//Responsive Video Shortcode

jQuery('.vid_iframe').each(function () {
	var vidheights = jQuery(this).height();
jQuery(this).closest('.ast_vid').css({ 'height':vidheights});

});

//Shortcode JS
//Tabs Javascript
 jQuery(".lts_tab p:empty").remove();
  jQuery(".lts_tabs .lts_tabtitle.emptyp_clear").remove();
 var i = 1; 
 jQuery(".tabs-container").each(function (){ jQuery(this).find('a.tabtrigger').each(function (){
	 	jQuery(this).attr('href', '#tab-'+i+''); i++;
	});
 });
 	
 var i = 1; 
 jQuery(".tabs-container").each(function (){
	 jQuery(this).find(".lts_tab_child").not(':empty').each(function (){
	 	jQuery(this).attr('id', 'tab-'+i+''); i++;
	 });
 });
 
 var i = 1; 
 jQuery(".tabs-container").each(function (){jQuery(this).attr('id', 'tabs-container_'+i+''); i++;});
 
  jQuery(".tabs-container.tabs_default").each(function (){ var tabid = jQuery(this).attr('id'); var active_color = jQuery(this).data('active-color');
	 jQuery('<style>body #'+tabid+' ul.tabs li.active a{color:'+active_color+'!important;border-color:'+active_color+'}</style>').appendTo('head');
 });
   jQuery(".tabs-container.tabs_circular").each(function (){ var tabid = jQuery(this).attr('id'); var active_color = jQuery(this).data('active-color');
	 jQuery('<style>body #'+tabid+' ul.tabs li.active a{color:'+jQuery('body').css('background-color')+'!important;background:'+active_color+'}</style>').appendTo('head');
 });
   jQuery(".tabs-container.tabs_minimal").each(function (){ var tabid = jQuery(this).attr('id'); var active_color = jQuery(this).data('active-color');
	 jQuery('<style>body #'+tabid+' ul.tabs li.active a{color:'+active_color+'!important;border-color:'+active_color+'}</style>').appendTo('head');
 });
    jQuery(".tabs-container.tabs_capsule").each(function (){ var tabid = jQuery(this).attr('id'); var active_color = jQuery(this).data('active-color');
	 jQuery('<style>body #'+tabid+' ul.tabs li.active a{color:'+jQuery('body').css('background-color')+'!important;background:'+active_color+';border-color:'+active_color+'}</style>').appendTo('head');
 });

jQuery('.tabs-container').easytabs({updateHash: false});
	
	//Toggle Shortcode
	jQuery('.lts_toggle_content').hide(); // Hide even though it's already hidden
	jQuery('.trigger').click(function() {
    jQuery(this).closest('.lts_toggle').find('.lts_toggle_content').slideToggle("fast"); // First click should toggle to 'show'
	  return false;
   });
   	jQuery('.lts_toggle a.trigger').toggle(function(){
		jQuery(this).find('i').animateRotate(135);
		jQuery(this).addClass('down');
	}, function(){
		jQuery(this).find('i').animateRotate(-90);
		jQuery(this).removeClass('down');	
	});
	
	//Widget image opacity animation
	jQuery('.widget_wrap a img').hover(function(){
		jQuery(this).stop().animate({ "opacity":"0.7" }, 300);
		}, function(){
		jQuery(this).stop().animate({ "opacity":"1" }, 300);	
	});

	
	//add CLASS for Slider Widget 
	for (var i=0; i<10; i++){  
		jQuery('.ast_slider_widget .slide_wdgt:eq('+i+')').attr('id', 'lts_wdgt_nivo'+i+''); 
		jQuery('.ast_slider_widget #lts_wdgt_nivo'+i+'').nivoSlider({effect: 'fade', directionNav: true, prevText: '<i class="fa fa-chevron-left"></i>', nextText: '<i class="fa fa-chevron-right"></i>',  controlNav: false, }); 
	}
	//Call to action shortcode animation
	jQuery('.act_right a').hover(function(){
		jQuery(this).addClass('animated pulse');
		}, function(){
		jQuery(this).removeClass('animated pulse');	
	});
	
	
	
/*MAINTENANCE MODE*/
jQuery('.lgn_info').miniTip({anchor: 'w'});


/*CHECK IF TOUCH ENABLED DEVICE*/
	function is_touch_device() {
	 return (('ontouchstart' in window)
		  || (navigator.MaxTouchPoints > 0)
		  || (navigator.msMaxTouchPoints > 0));
	}
 

	if (is_touch_device()) {
		jQuery('body').addClass('touchon');
	}
	//CountDown Widget
	jQuery(".ast_countdown #countdown").countdown(jQuery(".ast_countdown #countdown").attr('data-countdown')).on('update.countdown', function(event) {
   jQuery(this).html(event.strftime(''
	+ '<li><span class="days">%D</span><p class="timeRefDays">day%!d</p></li>'
	+ '<li><span class="hours">%H</span><p class="timeRefHours">Hour</p></li>'
	+ '<li><span class="minutes">%M</span><p class="timeRefMinutes">Min</p></li>'
	+ '<li><span class="seconds">%S</span><p class="timeRefSeconds">Sec</p></li>'));
	});


//ToolTip Shortcode
jQuery('.tooltip').miniTip({ fadeIn: 100 });

//post shortcode layout1 thumbnal resize
	var laywidth = jQuery('.lts_layout1 .listing-item').width();
	jQuery('.lts_layout1 .listing-item').height( (laywidth * 66)/100);
	jQuery(window).resize(function() {
		var laywidth = jQuery('.lts_layout1 .listing-item').width();
		jQuery('.lts_layout1 .listing-item').height( (laywidth * 66)/100);
	});
	
	var flaywidth = jQuery('.lay1 .hentry').width();
		jQuery('.lay1 .ast_row').height( (flaywidth * 66)/100);
	jQuery(window).resize(function() {
		var flaywidth = jQuery('.lay1 .hentry').width();
		jQuery('.lay1 .ast_row').height( (flaywidth * 66)/100);
	});
	
jQuery(window).ready(function() {
	
if(jQuery('body .lts_layout3').length){
	jQuery('.lts_layout3 .listing-item').wrapAll('<div class="lts3_inner" />');
//Layout3 Shortcode Masonry 
	var container = document.querySelector('.lts3_inner');
	var msnry;
	imagesLoaded( container, function() {
		new Masonry( container, {
	  // options
	  itemSelector: '.listing-item'
	});
	});
}
});

});