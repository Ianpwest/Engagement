$(function() {
	"use strict";
	var stickOnScroll;
	
	//Header Option	
	$('#header').addClass('normal');
	//Choose Here Class Name (normal or fixed or intelligent);
	
	if($('#wrapper').hasClass('boxed')){
		$('body').addClass('bg-grey');
	}

	$("#people").owlCarousel({
		autoPlay : 3000, 
		items : 4,
		itemsDesktop : [1199, 4],
		itemsDesktopSmall : [979, 4],
		itemsTablet : [768, 3],
		itemsMobile : [767, 1],
		navigation : true
	});
	
	$("#people-thought").owlCarousel({
		autoPlay : 3000, 
		items : 3,
		itemsDesktop : [1199, 3],
		itemsDesktopSmall : [979, 3],
		itemsTablet : [768, 3],
		itemsMobile : [767, 1],
		navigation : true
	});
	
	$("#wedding-item").owlCarousel({
		autoPlay : false,
		items : 3,
		itemsDesktop : [1199, 3],
		itemsDesktopSmall : [979, 3],
		itemsTablet : [768, 3],
		itemsMobile : [767, 1],
		navigation : true
	});

	$("#partner-slider").owlCarousel({
		autoPlay : false,
		items : 4,
		itemsDesktop : [1199, 4],
		itemsDesktopSmall : [979, 3],
		itemsTablet : [768, 3],
		itemsMobile : [767, 1],
		navigation : true
	});

	$(".team-slider").owlCarousel({
		autoPlay : 3000,
		items : 3,
		itemsDesktop : [1199, 3],
		itemsDesktopSmall : [992, 3],
		itemsTablet : [768, 3],
		itemsMobile : [767, 1],
		navigation : true
	});

	$(".home-menu").on('click', function() {
		$(this).toggleClass("active");
		$(this).toggleClass("remove");
		$(".navigation").slideToggle(500);
	});

	$('.navigation li').on('click', function() {
		if ($(window).width() < 768) {
			$(this).children('.drop-down').slideToggle();
		}
	});

	$(window).resize(function() {

		var w = $(window).width();
		if ((w > 768) && $(".navigation").is(':hidden')) {

			$(".navigation").removeAttr('style');
			
		}
	});

	if ($("#countdown").length) {
		$("#countdown").countdown({
			until : new Date(2020, 6-1, 19)
			//A note on Date - the JavaScript Date constructor expects the year, month, and day as parameters. However, 
			//the month ranges from 0 to 11. To make explicit what date is intended (does a month of 3 mean March or April?) 
			//I specify the month from 1 to 12 and manually subtract the 1. Thus the following denotes 25 December, 2014.
			//http://keith-wood.name/countdown.html
			//http://keith-wood.name/countdownRef.html
		});

	}

	// Filltering
		$(window).load(function(){
		if ($('.gallery-part .gallery-img-sec').length) {

		var $container = $('.gallery-img-sec').isotope({
			itemSelector : '.main-item',
			layoutMode : 'fitRows'
		})

		$('.gallery-part .tabbing-wrapper button').on('click', function() {

			var filterValue = "." + $(this).attr('data-filter');
			$container.isotope({
				filter : filterValue
			});
			var fancybox = $(this).attr('data-filter');
			$(filterValue).find('a').attr({
				'data-fancybox-group' : fancybox
			});

		});
	}
	});


	if ($('.fancybox-button').length) {
		$(".fancybox-button").fancybox({
			prevEffect : 'none',
			nextEffect : 'none',
			closeBtn : true,
			helpers : {
				title : {
					type : 'inside'
				},
				buttons : {}
			}
		});
	}

	$('.control').on('click', function() {
		$(this).remove();
		var video = '<iframe src="' + $('.video img').attr('data-video') + '"></iframe>'
		$('.video img').after(video);
		return false;
	});

	if ($('.project').length) {
		$('.project').appear(function() {
			$('.project').countTo({
				from : 0,
				to : 178
			});

			$('.award').countTo({
				from : 0,
				to : 16
			});

			$('.montre').countTo({
				from : 0,
				to : 178
			});

			$('.hours').countTo({
				from : 0,
				to : 2600
			});

		});

	}

	//Custom Map
	if ($('#map-view').length) {
		var pos = new google.maps.LatLng(41.236859, -73.667425);

		var map = new google.maps.Map(document.getElementById('map-view'), {
			zoom : 16,
			center : pos,
			scrollwheel : false,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});

		var pos1 = new google.maps.LatLng(41.238282, -73.668761);
		var pos2 = new google.maps.LatLng(41.237500, -73.668320);
		var pos3 = new google.maps.LatLng(41.234900, -73.675830);

		var marker1 = new google.maps.Marker({
			position : pos1,
			map : map,
			draggable : false,
			icon : 'assets/images/map-icon-2.png'
		});

		var marker2 = new google.maps.Marker({
			position : pos2,
			map : map,
			draggable : false,
			icon : 'assets/images/map-icon-2.png'

		});
		var marker3 = new google.maps.Marker({
			position : pos3,
			map : map,
			draggable : false,
			icon : 'assets/images/map-icon-2.png'

		});

	}

	if ($('#map').length) {

		var pos = new google.maps.LatLng(41.236859, -73.667425);

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom : 16,
			center : pos,
			scrollwheel : false,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});

		var pos1 = new google.maps.LatLng(41.238282, -73.668761);
		var pos2 = new google.maps.LatLng(41.237500, -73.668320);
		var pos3 = new google.maps.LatLng(41.234900, -73.675830);

		var marker1 = new google.maps.Marker({
			position : pos1,
			map : map,
			draggable : false,
			icon : 'assets/images/locater-img.png'
		});

	}

	$(window).load(function() {
		$("#loading").fadeOut(500);
		
		
		
	});
	//=================Header Style function================
		if ($('#header').hasClass('fixed')) {
			$('#header').next().addClass('top-m');
		}
		if ($('#header').hasClass('intelligent')) {
			$('#header').next().addClass('top-m');
		};

	var class_pr = $('body').attr('class');
	var headerHeight = $('#header').outerHeight();
	var st = $(window).scrollTop();
	stickOnScroll = function() {

		if ($('#header').hasClass("intelligent")) {

			$('#header').removeClass('normal');
			$('#header').next().addClass('top-m');
			var pos = $(window).scrollTop();

			if (pos > headerHeight) {
				if (pos > st) {
					$('#header').addClass('simple')
					$('#header.simple').removeClass('down');
					$('#header.simple').addClass('fixed up');

				} else {
					$('#header.simple').removeClass('up');
					$('#header.simple').addClass('fixed down');

				}
				st = pos;

			} else {
				$('#header.simple').removeClass('fixed down up simple');
			}
			if (pos == $(document).height() - $(window).height()) {
				$('#header.simple').removeClass('up');
				$('#header.simple').addClass('fixed down');
			}

		} else if ($('body').hasClass("fix")) {

			$('#header').next().addClass('top-m');
			$('#header').addClass('simple fixed');
			$('#header').removeClass('down up');
			$('#wrapper').css({
				paddingTop : 0
			});
		} else {

			$('#header.simple').removeClass('fixed down up simple');
			$('#header').addClass('normal');
			
			$('#wrapper').css({
				paddingTop : 0
			});
		}
	};
	stickOnScroll();
	$(window).scroll(function() {
		stickOnScroll();
	});

	// end for sticky header


	});