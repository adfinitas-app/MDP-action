$(document).ready(function() {

	$('.anchor').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top
		});
	});

	$('#plus').click(function(e) {
		e.preventDefault();
		var display = $('#text-plus').css('display');
		if ( display === 'none') {
			$(this).attr('src', 'img/x.png');
		}
		$('#text-plus').slideToggle();
		$('#nono').slideToggle();
		$('#confidentialite').slideToggle();

		if ( display !== 'none') {
			$(this).attr('src', 'img/+.png');
		}
	});

	function isMobile()
	{
		if ($(window).width() < 640)
			return true;
		return false;
	}

	$(window).resize(function() {
		if (isMob && !isMobile()) {
			isMob = false;
			$('.stickybtn').css('position', 'fixed');
		} else if (!isMob && isMobile()) {
			isMob = true;
			$('.stickybtn').css('position', 'absolute');
			if ( $(window).scrollTop() > 100) {
				$('.stickybtn2').show();
			}
			else {
				$('.stickybtn2').hide();
			}
		}
	});

	$(window).scroll(function() {
		if (isMob) {
			if ( $(window).scrollTop() > 100) {
				$('.stickybtn2').show();
			}
			else {
				$('.stickybtn2').hide();
			}
		}
	});

	$('#logo').click(function() {
		woopra.track('interaction', {
			category: 'LOGO_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	$('.stickybtn, .stickybtn2').parent().click(function() {
		var str = changelink();
		console.log('bonjour');
		$(this).attr('href', $(this).attr('href') + str);
		woopra.track('interaction', {
			category: 'DON-CTA_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	function changelink()
	{
		var str = '';

		if ('wv_email' in p)
		{
			str += '&wv_email=' + p['wv_email'];
		}
		if ('wv_firstname' in p)
		{
			str += '&wv_firstname=' + p['wv_firstname'];
		}
		if ('wv_lastname' in p)
		{
			str += '&wv_lastname=' + p['wv_lastname'];
		}
		return str;
	}

	/* MAIN */

	var isMob = isMobile();

	if (isMob) {
		$('.stickybtn').css('position', 'absolute');
		if ( $(window).scrollTop() > 100) {
			$('.stickybtn2').show();
		}
		else {
			$('.stickybtn2').hide();
		}
	}
	var str = changelink();
	$('.stickybtn .stickybtn2').attr('href', )
	console.log('str :' + str);
});
