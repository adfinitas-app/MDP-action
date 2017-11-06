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
			$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/MDP-LP-No%C3%ABl/x.png');
		}
		$('#text-plus').slideToggle();
		$('#nono').slideToggle();
		$('#confidentialite').slideToggle();

		if ( display !== 'none') {
			$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/MDP-LP-No%C3%ABl/%2B.png');
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

	$('.stickybtn, .stickybtn2').parent('a').click(function() {
		var str = changelink();
		$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA&amount=10000' + str);
		woopra.track('interaction', {
			category: 'DON-CTA_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	$('#eq1').click(function() {
		var str = changelink();
		$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-55&amount=5500' + str);
		woopra.track('interaction', {
			category: 'DON-CTA-55_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	$('#eq2').click(function() {
		var str = changelink();
		$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-100&amount=10000' + str);
		woopra.track('interaction', {
			category: 'DON-CTA-100_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	$('#eq3').click(function() {
		var str = changelink();
		$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-165&amount=16500' + str);
		woopra.track('interaction', {
			category: 'DON-CTA-165_NOEL17',
			action: 'clic',
			url: document.location.href,
			title: document.title
		});
	});

	$('#autre').click(function() {
		var str = changelink();
		$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-AUTRE' + str);
		woopra.track('interaction', {
			category: 'DON-CTA-AUTRE_NOEL17',
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

	function setDefault()
	{

	}

	function animate()
	{
		top1.animate({
			top: '-125px',
			left: '20px'
		}, 'fast');
		top2.animate({
			top: '-140px'
		}, 'fast');
		top3.animate({
			top: '-125px',
			left: '120px'
		}, 'fast');
	}

	function startAnimation()
	{
		var i = 0;
		var intervalId = setInterval(function() {
			if (i % 2 === 0) {
				animate();
			} else {
				setDefault();
			}
			i++;
			if (i > 20) {
				console.log('finished');
				clearInterval(intervalId);
			}
		}, 700);
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

	var top1 = $('.top1');
	var top2 = $('.top2');
	var top3 = $('.top3');

	var bot1 = $('.bot1');
	var bot2 = $('.bot2');
	var bot3 = $('.bot3');

	startAnimation();
});
