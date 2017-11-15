var loadedpct = 0,
	timepct = 0,
	loadId,
	musicTimeOut,
	songState = true,
	hasScrolled = false,
	check = true;

var	site = {
		start: 					function() {
			console.log('starting site');
			$('#loading-screen').waitForImages({
				finished: function () {
					site.init();
				},
				waitForAll: true
			})
		},
		init: 					function () {
			console.log('Init');
			site.changeLinks();
			site.waitLoading();
			$(window).resize(site.resize);
		},
		resize: 				function () {
			site.setVideoDimensions('#introduction');
			site.setVideoDimensions('#introgif');
			site.setVideoDimensions('#videogif');
		},
		waitLoading:			function () {
			$('#introduction-screen, .global_container').waitForImages({
				finished: function () {
					console.log('finished to load LP');
					var waitTime = setInterval(function () {
						if (timepct >= 100) {
							site.launchIntroVideo();
							clearInterval(waitTime);
						}
					}, 100);
				},
				each: function (loaded, total, success) {
					loadedpct = Math.floor(loaded / total * 100);
				},
				waitForAll: true
			});
			site.fillShield();
			site.songStateEvent();
			// Faire event pour le songState
		},
		fillShield: 			function() {
			loadId = setInterval(function() {
				if (timepct > 100) {
					clearInterval(loadId);
				} else {
					timepct++;
					if (timepct < loadedpct) {
						$('#bg-shield').css('width', timepct + '%');
					} else {
						$('#bg-shield').css('width', loadedpct + '%');
					}
				}
			}, 40);
		},
		songStateEvent: 		function () {
			$('#icon-son').click(function() {
				if ( $(this).hasClass('desactivated') ) {
					$(this).addClass('activated').removeClass('desactivated');
					$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Noel2017/loadingImg/icon-son.png'); // link to icon-son active
					songState = true;
				} else if ( $(this).hasClass('activated') ) {
					$(this).addClass('desactivated').removeClass('activated');
					$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Noel2017/loadingImg/icon-son-off.png'); // link to icon-son desactive
					songState = false;
				}
			});
		},
		launchIntroVideo: 		function() {
			// Lance l'animation après 1 sec
			site.eventVideoGUI();
			setTimeout(function () {
				$('#introduction-screen').show();
				$('#diagram-son').css('visibility', 'visible');
				$('#loading-screen').hide();
				site.setVideoDimensions('#introduction');
				site.playVideo('introduction');
				//site.prepareSongFadeOut();
				songState ? site.playSong() : x = 1;
			}, 1000);
		},
		eventVideoGUI: 			function () {
			$('#diagram-son').click(function () {
				var audio = document.querySelector('#audio');
				audio.paused ? audio.play() : audio.pause();
			});
			$('#skip-intro').click(function() {
				$('#introduction').trigger('ended');
				//site.songFadeOut();
				clearTimeout(musicTimeOut);
			});
			$('#introduction').on('ended', site.launchVisualKey);
		},
		playVideo: 				function (elem) {
			document.getElementById(elem).play();
		},
		playSong: 				function () {
			document.getElementById('audio').play();
		},
		setVideoDimensions:		function (videoElem) {
			var video = document.querySelector(videoElem)
			, container = document.querySelector('#introduction-screen');

			var w = video.videoWidth
			, h = video.videoHeight;

			var videoRatio = (w / h).toFixed(2);

			var containerStyles = window.getComputedStyle(container)
			, minW = parseInt( containerStyles.getPropertyValue('width') )
			, minH = parseInt( containerStyles.getPropertyValue('height') );

			var widthRatio = minW / w
			, heightRatio = minH / h;

			if (widthRatio > heightRatio) {
				var newWidth = minW;
				var newHeight = Math.ceil( parseInt(newWidth + 10) / videoRatio );
			}
			else {
				var newHeight = minH;
				var newWidth = Math.ceil( newHeight * videoRatio );
			}

			video.style.width = newWidth + 'px';
			video.style.height = newHeight + 'px';
		},
		prepareSongFadeOut: 	function () {
			musicTimeOut = setTimeout(site.songFadeOut, 13000); // vidéo à partir du fondu
		},
		songFadeOut: 			function () {
			var audio = document.querySelector('#audio');
			var songId = setInterval(function() {
				if (audio.volume > 0) {
					audio.volume = parseFloat((audio.volume - 0.1).toFixed(1));
				} else {
					audio.pause();
					clearInterval(songId);
				}
			}, 100);
		},
		launchVisualKey: 		function () {
			$('#introduction-screen').hide();
			$('.global_container').fadeIn(500);
			site.eventVisualKey();
		},
		eventVisualKey: 		function() {
			$(window).scroll(function() {
				if (!hasScrolled) {
					site.launchLP();
				}
			});
			$('#visual-key .container').click(site.launchLP);
		},
		launchLP: 				function () {
			hasScrolled = true;
			$('html, body').animate({
				scrollTop: $('#top').offset().top
			}, 500);
			setTimeout(function() {
				$('section#visual-key').hide();
			}, 600);
			site.songFadeOut();
			$('#diagram-son').css('visibility', 'hidden');
			site.eventLP();
		},
		changeLinks: 			function() {
			var query = site.extractUrlParams();
			var str = '';
			var url = 'https://soutenir.la-spa.fr/b';
			var cid = '178';

			if ('reserved_code_media' in query && query['reserved_code_media'] !== 'undefined') {
				str += '&' + 'reserved_code_media=' + query['reserved_code_media'];
			}
			if ('wv_email' in query) {
				str += '&' + 'email=' + query['wv_email'];
			}
			if ('wv_firstname' in query) {
				str += '&' + 'firstname=' + query['wv_firstname'];
			}
			if ('wv_lastname' in query) {
				str += '&' + 'lastname=' + query['wv_lastname'];
			}
			if ('reserved_code_media' in query && query['reserved_code_media'].slice(0, 4) === 'W17F') {
				cid = '177';
			}

			url = 'https://soutenir.la-spa.fr/b?cid=' + cid;
			$('.don_commun').attr('href', url + '&amount=6000' + str);
			if (cid === "178") {
				$('#don_shirt').attr('href', url + '&amount=8000' + str);

				$('#don_1').attr('href', url + '&amount=4500' + str);
				$('#don_1 .amount').html('45€');
				$('#don_1 .deduction').html('(15€ après réduction fiscale)');

				$('#don_2').attr('href', url + '&amount=7000' + str);
				$('#don_2 .amount').html('70€');
				$('#don_2 .deduction').html('(24€ après réduction fiscale)');

				$('#don_3').attr('href', url + '&amount=11000' + str);
				$('#don_3 .amount').html('110€');
				$('#don_3 .deduction').html('(37€ après réduction fiscale)');

			}
			else {
				$('#don_shirt').attr('href', url + '&amount=9000' + str);
				$('#don_1').attr('href', url + '&amount=7000' + str);
				$('#don_1 .amount').html('70€');
				$('#don_2').attr('href', url + '&amount=9000' + str);
				$('#don_2 .amount').html('90€');
				$('#don_3').attr('href', url + '&amount=12000' + str);
				$('#don_3 .amount').html('120€');
			}
			$('#don_libre').attr('href', url + str);
		},
		extractUrlParams: 		function() {
			var t = document.location.search.substring(1).split('&'); var f = [];
			for (var i=0; i<t.length; i++){
				var x = t[ i ].split('=');
				f[x[0]]=decodeURIComponent(x[1]);
			}
			return f;
		},
		eventLP: 				function () {
			$('#fb_1, #fb_2, #fb_3').click(function(e) {
				e.preventDefault();
				var image;

				image = $(this).attr('id') === 'fb_1' ? 'https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Noel2017/GoTChienA.png' : ($(this).attr('id') === 'fb_2') ? 'https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Noel2017/GoTChat.png' : 'https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Noel2017/GoTChienB.png';
				console.log('image: ' + image);
				FB.ui({
					method: 'share_open_graph',
					action_type: 'og.shares',
					action_properties: JSON.stringify({
						object: {
							'og:url': "http://lhiver-arrive.la-spa.fr",
							'og:title': "Ils ont besoin de vous",
							'og:description': "L'hiver arrive. La menace est bien réelle. Pour eux ce n'est pas une fiction. Aidez-les maintenant, faites un don à la SPA.",
							'og:image': image
						}
					})
				},
				function (response) {});
			});
			$('#BT_Bulle').click(function(e) {
				e.preventDefault();
				$('#Bulle').css('display', 'block');
			});
			$('#BT_Joe').click(function(e) {
				e.preventDefault();
				$('#Joe').css('display', 'block');
			});
			$('#BT_Imotep').click(function(e) {
				e.preventDefault();
				$('#Imotep').css('display', 'block');
			});
			$('#Bulle .close').click(function(e) {
				e.preventDefault();
				$('#Bulle').css('display', 'none');
			});
			$('#Joe .close').click(function(e) {
				e.preventDefault();
				$('#Joe').css('display', 'none');
			});
			$('#Imotep .close').click(function(e) {
				e.preventDefault();
				$('#Imotep').css('display', 'none');
			});


			$('#BT_Bulle_mobile').click(function(e) {
				e.preventDefault();
				$('#Bulle_mobile').css('display', 'block');
			});
			$('#BT_Joe_mobile').click(function(e) {
				e.preventDefault();
				$('#Joe_mobile').css('display', 'block');
			});
			$('#BT_Imotep_mobile').click(function(e) {
				e.preventDefault();
				$('#Imotep_mobile').css('display', 'block');
			});
			$('#Bulle_mobile .close').click(function(e) {
				e.preventDefault();
				$('#Bulle_mobile').css('display', 'none');
			});
			$('#Joe_mobile .close').click(function(e) {
				e.preventDefault();
				$('#Joe_mobile').css('display', 'none');
			});
			$('#Imotep_mobile .close').click(function(e) {
				e.preventDefault();
				$('#Imotep_mobile').css('display', 'none');
			});

			$('.remodal-close').click(function(){
				$('#yt-video').attr('src', $('iframe').attr('src'));
			});

			$('.remodal').click(function(){
				var inst = $('[data-remodal-id=video-header]').remodal();
				inst.close();
				$('#yt-video').attr('src', $('iframe').attr('src'));
			});

			$('.btn-video a img').click(function() {
				var intervalId = setInterval(function() {
					if (player) {
						player.playVideo();
						clearInterval(intervalId);
					}
				},500);
			});

			$("body:not(.remodal)").click(stopVideo);

			var changeOpac = '0.7';
			var clignote = $('.clignote');
			setInterval(function() {
				clignote.css('opacity', changeOpac);
				if (changeOpac === '0.7')
				changeOpac = '1';
				else
				changeOpac = '0.7';
			}, 500);
		},
	};

	//document ready
$(document).ready(function () {

});

//content ready
$(window).on('load', function() {
	site.start();
});

var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		videoId: 'd8TIhjcLZpQ',
		events: {
			onStateChange: onPlayerStateChange
		}
	});
}

function onPlayerStateChange(event) {
	if (event.data === YT.PlayerState.PLAYING && check == true) // BEGIN
	{
		check = false;
		woopra.track("interaction", {
			action : "video-start",
			category : "lhiverarrive",
			url : document.location.href,
			title : document.title
		});
	}
	if(event.data === YT.PlayerState.ENDED) { // FINISHED
		woopra.track("interaction", {
			action : "video-end",
			category : "lhiverarrive",
			url : document.location.href,
			title : document.title
		});
	}
}

function stopVideo() {
	if (player) {
		player.pauseVideo();
	}
}
